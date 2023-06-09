import { useContext, useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import { CartContext } from "../contexts/CartContext";
import styled from "styled-components";
import CartItem from "../components/CartItem";
import sumCart from "../utils/sumCart";
import formatCurrency from "../utils/formatCurrency";
import useTheme from "../hooks/useTheme";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";
import FormContainerWrapper from "../components/FormContainer";
import ErrWrapper from "../components/Err";
import { ThreeDots } from "react-loader-spinner";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);
  const { colors } = useTheme();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [clearErrMsg, setClearErrMsg] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const errRef = useRef();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const setInputInitialValues = (shipmentInfo) => {
    shipmentInfo?.firstName && setFirstName(shipmentInfo.firstName);
    shipmentInfo?.lastName && setLastName(shipmentInfo.lastName);
    shipmentInfo?.cpf && setCpf(shipmentInfo.cpf);
    shipmentInfo?.phone && setPhone(shipmentInfo.phone);
    shipmentInfo?.address && setAddress(shipmentInfo.address);
    shipmentInfo?.city && setCity(shipmentInfo.city);
    shipmentInfo?.uf && setUf(shipmentInfo.uf);
    shipmentInfo?.country && setCountry(shipmentInfo.country);
    shipmentInfo?.postalCode && setPostalCode(shipmentInfo.postalCode);
  };

  useEffect(() => {
    const getLastOrder = async () => {
      try {
        const response = await axiosPrivate("/orders/last");
        if (response.status === 204) return null;
        setInputInitialValues(response.data.shipmentInfo);
        return response;
      } catch (err) {
        console.log(err);
        return null;
      }
    };
    auth?.accessToken && getLastOrder();
  }, []);

  const handleInputChange = (value, setFunction) => {
    !clearErrMsg && setClearErrMsg(true);
    setFunction(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setClearErrMsg(false);

    if (!firstName) return setErrMsg("Missing First Name");
    if (!lastName) return setErrMsg("Missing Last Name");
    if (!cpf) return setErrMsg("Missing CPF");
    if (!phone) return setErrMsg("Missing Phone");
    if (!address) return setErrMsg("Missing Full Address");
    if (!city) return setErrMsg("Missing City");
    if (!uf) return setErrMsg("Missing UF");
    if (!country) return setErrMsg("Missing Country");
    if (!postalCode) return setErrMsg("Missing Postal Code");

    if (cart.length === 0)
      return setErrMsg("Empty cart! Select one or more products to proceed");

    const order = {
      products: cart.map((item) => {
        return { count: item.count, product: item.product._id };
      }),
      orderTotal: sumCart(cart),
      shipmentInfo: {
        firstName,
        lastName,
        cpf,
        phone,
        address,
        city,
        uf,
        country,
        postalCode,
      },
    };

    if (!auth) {
      return navigate("/login", { state: { order } });
    }

    try {
      setIsLoading(true);
      const res = await axiosPrivate.post("/orders", order);
      const orderId = res.data._id;
      setCart([]);
      return navigate(`/order/${orderId}`, { replace: true });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (clearErrMsg) setErrMsg("");
  }, [firstName, lastName, cpf, phone, address, city, uf, country, postalCode]);

  return (
    <>
      <Header />
      <PageContainer>
        <OrderFormContainer>
          <FormContainerWrapper height="">
            <h1>Shipment Info</h1>
            <ErrWrapper status={errMsg ? "errmsg" : "offscreen"}>
              <span ref={errRef}>{errMsg}</span>
            </ErrWrapper>
            <form>
              <HorizontalContainer>
                <LeftInput
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) =>
                    handleInputChange(e.currentTarget.value, setFirstName)
                  }
                  disabled={isLoading}
                />
                <RightInput
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) =>
                    handleInputChange(e.target.value, setLastName)
                  }
                  disabled={isLoading}
                />
              </HorizontalContainer>
              <input
                type="text"
                placeholder="CPF"
                value={cpf}
                onChange={(e) => handleInputChange(e.target.value, setCpf)}
                disabled={isLoading}
              />

              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => handleInputChange(e.target.value, setPhone)}
                disabled={isLoading}
              />
              <input
                type="text"
                placeholder="Full Address"
                value={address}
                onChange={(e) => handleInputChange(e.target.value, setAddress)}
                disabled={isLoading}
              />
              <HorizontalContainer>
                <LeftInput
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => handleInputChange(e.target.value, setCity)}
                  disabled={isLoading}
                />
                <input
                  type="text"
                  placeholder="UF"
                  value={uf}
                  onChange={(e) => handleInputChange(e.target.value, setUf)}
                  disabled={isLoading}
                />
                <RightInput
                  type="text"
                  placeholder="Country"
                  value={country}
                  onChange={(e) =>
                    handleInputChange(e.target.value, setCountry)
                  }
                  disabled={isLoading}
                />
              </HorizontalContainer>
              <input
                type="text"
                placeholder="Postal Code"
                value={postalCode}
                onChange={(e) =>
                  handleInputChange(e.target.value, setPostalCode)
                }
                disabled={isLoading}
              />
            </form>
          </FormContainerWrapper>
        </OrderFormContainer>
        <CartContainer>
          <CartItemsContainer>
            {cart.map((item) => (
              <CartItem
                key={item.product._id}
                product={item.product}
                count={item.count}
              />
            ))}
          </CartItemsContainer>
          <OrderSummary colors={colors}>
            <span>
              Total:{" "}
              <span className="price">{formatCurrency(sumCart(cart))}</span>
            </span>
            <ButtonsContainer>
              <Button className="continue-shopping" colors={colors}>
                <Link to={-1}>Continue Shopping</Link>
              </Button>

              <Button
                className="place-order"
                colors={colors}
                onClick={handleSubmit}
                disabled={!cart?.length || isLoading}
              >
                {isLoading ? (
                  <Span>
                    <ThreeDots
                      height="80"
                      width="80"
                      radius="9"
                      color={colors.primary}
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClassName=""
                      visible={true}
                    />
                  </Span>
                ) : (
                  "Place Order"
                )}
              </Button>
            </ButtonsContainer>
          </OrderSummary>
        </CartContainer>
      </PageContainer>
    </>
  );
};

const PageContainer = styled.main`
  display: flex;
  margin-top: 10px;
  margin-inline: 50px;
  padding: 1em;
  min-width: 1000px;
  height: 600px;
  border-radius: 3px;
`;

const OrderFormContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding-inline: 1em;
`;

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
`;

const CartItemsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1em;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const OrderSummary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 100px;
  padding: 1em;

  & span {
    font-size: 1.5rem;
    font-weight: 500;
  }

  & span.price {
    color: ${(props) => props.colors.primary};
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  height: 48px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
  width: 200px;
  height: 100%;
  border-radius: 3px;
  font-size: 1.1rem;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.colors.addToCartHoverBg};
  }

  &.continue-shopping {
    background-color: ${(props) => props.colors.addToCartBg};
    border: 1px solid ${(props) => props.colors.primary};
    color: ${(props) => props.colors.primary};
  }

  &.place-order {
    background-color: ${(props) => props.colors.primary};
    border: 1px solid ${(props) => props.colors.primary};
    color: white;
    &:disabled {
      background-color: #ccc;
      color: #999;
      cursor: not-allowed;
      text-decoration: line-through;
    }
  }
`;

const HorizontalContainer = styled.div`
  display: flex;
`;
const LeftInput = styled.input`
  margin-left: 0 !important;
`;

const RightInput = styled.input`
  margin-right: 0 !important;
`;
const Span = styled.span`
  width: 100%;
  height: 24px;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default Cart;

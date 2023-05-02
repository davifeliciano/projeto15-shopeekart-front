import { useContext, useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import { CartContext } from "../contexts/CartContext";
import styled from "styled-components";
import CartItem from "../components/CartItem";
import sumCart from "../utils/sumCart";
import formatCurrency from "../utils/formatCurrency";
import useTheme from "../hooks/useTheme";
import { Link } from "react-router-dom";
import FormContainerWrapper from "../components/FormContainer";

const Cart = () => {
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
  const errRef = useRef();

  const handleInputChange = (e, setFunction) => {
    !clearErrMsg && setClearErrMsg(true)
    setFunction(e.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault()
    setClearErrMsg(false)

    try {}
    catch (err) {}
    finally {
    }
  }
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
            <form>
              <HorizontalContainer>
                <LeftInput
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => handleInputChange(e, setFirstName)}
              />
              <RightInput
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => handleInputChange(e, setLastName)}
              />
              </HorizontalContainer>
              <input
                type="text"
                placeholder="CPF"
                value={cpf}
                onChange={(e) => handleInputChange(e, setCpf)}
              />
              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => handleInputChange(e, setPhone)}
              />
              <input
                type="text"
                placeholder="Full Address"
                value={address}
                onChange={(e) => handleInputChange(e, setAddress)}
              />
              <HorizontalContainer>
              <LeftInput
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => handleInputChange(e, setCity)}
              />
              <input
                type="text"
                placeholder="UF"
                value={uf}
                onChange={(e) => handleInputChange(e, setUf)}
              />
              <RightInput
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => handleInputChange(e, setCountry)}
              />
              </HorizontalContainer>
              <input
                type="text"
                placeholder="Postal Code"
                value={postalCode}
                onChange={(e) => handleInputChange(e, setPostalCode)}
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
              <Button className="place-order" colors={colors} onClick={handleSubmit}>
                Place Order
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
  height: 800px;
  border-radius: 3px;
`;

const OrderFormContainer = styled.div`
  flex: 1;
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
  }
`;

const HorizontalContainer = styled.div`
  display: flex;
`
const LeftInput = styled.input`
  margin-left: 0 !important;
`

const RightInput = styled.input`
  margin-right: 0 !important;
`
export default Cart;

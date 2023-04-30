import { useContext } from "react";
import Header from "../components/Header";
import { CartContext } from "../contexts/CartContext";
import styled from "styled-components";
import CartItem from "../components/CartItem";
import sumCart from "../utils/sumCart";
import formatCurrency from "../utils/formatCurrency";
import useTheme from "../hooks/useTheme";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const { colors } = useTheme();

  return (
    <>
      <Header />
      <PageContainer>
        <OrderFormContainer></OrderFormContainer>
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
              <Button className="place-order" colors={colors}>
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

export default Cart;

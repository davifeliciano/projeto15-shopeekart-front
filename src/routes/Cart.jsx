import { useContext } from "react";
import Header from "../components/Header";
import { CartContext } from "../contexts/CartContext";
import styled from "styled-components";
import CartItem from "../components/CartItem";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);

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
  border-radius: 3px;
`;

const OrderFormContainer = styled.div`
  flex: 1;
`;

const CartContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CartItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

export default Cart;

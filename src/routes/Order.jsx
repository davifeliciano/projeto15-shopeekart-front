import styled from "styled-components";
import Header from "../components/Header";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import OrderItem from "../components/OrderItem";

const Order = () => {
  const { id } = useParams();
  const privateAxios = useAxiosPrivate();
  const [order, setOrder] = useState({});

  useEffect(() => {
    privateAxios
      .get(`/order/${id}`)
      .then((res) => {
        console.log(res);
        setOrder(res.data);
      })
      .catch(console.error);
  }, []);

  console.log(order);

  return (
    <>
      <Header />
      <PageContainer>
        <h2>Order Summary</h2>
        <OrderItemsContainer>
          {order.products?.map((item) => (
            <OrderItem
              key={item.product._id}
              product={item.product}
              count={item.count}
            />
          ))}
        </OrderItemsContainer>
      </PageContainer>
    </>
  );
};

const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  margin-top: 10px;
  margin-inline: 50px;
  height: 800px;

  & > h2 {
    line-height: 1.5;
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

const OrderItemsContainer = styled.div`
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

export default Order;

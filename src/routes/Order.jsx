import styled from "styled-components";
import Header from "../components/Header";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import OrderItem from "../components/OrderItem";
import ShipmentInfo from "../components/ShipmentInfo";
import useTheme from "../hooks/useTheme";
import formatCurrency from "../utils/formatCurrency";

const Order = () => {
  const { id } = useParams();
  const privateAxios = useAxiosPrivate();
  const [order, setOrder] = useState({});
  const { colors } = useTheme();

  useEffect(() => {
    privateAxios
      .get(`/order/${id}`)
      .then((res) => setOrder(res.data))
      .catch(console.error);
  }, []);

  return (
    <>
      <Header />
      <PageContainer>
        <h2>Order Summary</h2>
        <OrderInfoContainer>
          <ShipInfoContainer>
            {Object.keys(order).length !== 0 && (
              <>
                <ShipmentInfo shipmentInfo={order.shipmentInfo} />
                <TotalPrice colors={colors}>
                  <span>
                    Total:{" "}
                    <span className="price">
                      {formatCurrency(order.orderTotal.$numberDecimal)}
                    </span>
                  </span>
                </TotalPrice>
              </>
            )}
          </ShipInfoContainer>
          <OrderItemsContainer>
            {order.products?.map((item) => (
              <OrderItem
                key={item.product._id}
                product={item.product}
                count={item.count}
              />
            ))}
          </OrderItemsContainer>
        </OrderInfoContainer>
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

  & > h2 {
    line-height: 1.5;
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

const OrderInfoContainer = styled.div`
  display: flex;
  gap: 1em;
`;

const ShipInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 300px;
`;

const TotalPrice = styled.div`
  padding: 1em;
  background-color: white;
  border-radius: 3px;
  font-weight: 500;

  & span.price {
    color: ${(props) => props.colors.primary};
  }
`;

const OrderItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  overflow-y: scroll;
  height: 500px;

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

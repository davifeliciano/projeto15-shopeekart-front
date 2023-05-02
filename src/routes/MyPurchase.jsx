import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import styled from 'styled-components';
import useTheme from '../hooks/useTheme';

const MyPurchase = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [orders, setOrders] = useState([])
    const axiosPrivate = useAxiosPrivate()
    const { colors } = useTheme();

    useEffect(() => {
        const getAllOrders = async () => {
            const response = await axiosPrivate.get("/orders")
            console.log(response.data)
            setOrders(response.data)
            setIsLoading(false)
        }
        getAllOrders()
    }, [])

    return (
        <MyPurchaseContainer colors={colors}>
            <h1>My Purchase</h1>
            {isLoading && <h2>Loading...</h2>}
            {!isLoading && !orders?.length && <h2>You have no orders...</h2>}
            {!isLoading && orders?.length && 
                <div>
                    {orders.map((order, i) => 
                    <ul key={order._id}>
                        <h3>Order {i+1}</h3>
                        <li><b>Date</b>: {new Date(order.placedAt).toLocaleDateString('pt-BR')} </li>
                        <li><b>Total</b>:{order.orderTotal.$numberDecimal}</li>
                        <li><b>Sent to</b>: {`${order.shipmentInfo.firstName} ${order.shipmentInfo.lastName}`}</li>
                        <li><b>Address</b>: {order.shipmentInfo.address}</li>
                        <li><b>City</b>: {order.shipmentInfo.city} <b>UF</b>: {order.shipmentInfo.uf} <b>Country</b>: {order.shipmentInfo.country}</li>
                        <li><b>Postal Code</b>: {order.shipmentInfo.postalCode.replace(/^(\d{5})(\d{3})$/, '$1-$2')}</li>
                    </ul>)}
                </div>
            }
        </MyPurchaseContainer>
    );
};

const MyPurchaseContainer = styled.div`

  h1 {
    font-size: 2rem;
    margin-bottom: 20px;
    margin-top: 10px;
    text-align: center;
    letter-spacing: 1px;
    color: ${(props) => props.colors.h1};
  }
  h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
    margin-top: 100px;
    text-align: center;
    letter-spacing: 1px;
    color: ${(props) => props.colors.h1};
  }
  div{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    height: calc(100dvh - 362px);
overflow: scroll;
  }
  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 10px;
    margin-top: 5px;
    text-align: center;
    letter-spacing: 1px;
    color: ${(props) => props.colors.h1};
  }
  p {
    text-align: center;
    margin-bottom: 32px;
  }
  ul {
    border: 2px solid #ccc;
    margin: 20px;
    width: 400px;
    background-color: ${(props) => props.colors.secondary};
  }
  li {
    text-align: center;
    margin-bottom: 5px;
  }
  b{
    font-weight: 700;
  }
`

export default MyPurchase;
import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import useTheme from "../hooks/useTheme";
import FormContainerWrapper from "../components/FormContainer";
import ErrWrapper from "../components/Err";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { InfinitySpin } from "react-loader-spinner";

const MyAdresses = () => {
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
  const [lastOrderData, setLastOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const errRef = useRef();
  const axiosPrivate = useAxiosPrivate();

  const handleInputChange = (value, setFunction) => {
    !clearErrMsg && setClearErrMsg(true);
    setFunction(value);
  };

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
        setLastOrderData(response.data.shipmentInfo);
        setInputInitialValues(response.data.shipmentInfo);
        return response;
      } catch (err) {
        console.log(err);
        return null;
      } finally {
        setIsLoading(false);
      }
    };
    getLastOrder();
  }, []);

  useEffect(() => {
    if (clearErrMsg) setErrMsg("");
  }, [firstName, lastName, cpf, phone, address, city, uf, country, postalCode]);
  return (
    <Section>
      <OrderFormContainer>
        <FormContainerWrapper>
          <h1>Last Shipment Info</h1>
          {isLoading && (
            <LoaderContainer>
              <InfinitySpin width="200" color={colors.primary} />
            </LoaderContainer>
          )}
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
                readOnly
                disabled={isLoading}
              />
              <RightInput
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => handleInputChange(e.target.value, setLastName)}
                readOnly
                disabled={isLoading}
              />
            </HorizontalContainer>
            <input
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => handleInputChange(e.target.value, setCpf)}
              readOnly
              disabled={isLoading}
            />

            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => handleInputChange(e.target.value, setPhone)}
              readOnly
              disabled={isLoading}
            />
            <input
              type="text"
              placeholder="Full Address"
              value={address}
              onChange={(e) => handleInputChange(e.target.value, setAddress)}
              readOnly
              disabled={isLoading}
            />
            <HorizontalContainer>
              <LeftInput
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => handleInputChange(e.target.value, setCity)}
                readOnly
                disabled={isLoading}
              />
              <input
                type="text"
                placeholder="UF"
                value={uf}
                onChange={(e) => handleInputChange(e.target.value, setUf)}
                readOnly
                disabled={isLoading}
              />
              <RightInput
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => handleInputChange(e.target.value, setCountry)}
                readOnly
                disabled={isLoading}
              />
            </HorizontalContainer>
            <input
              type="text"
              placeholder="Postal Code"
              value={postalCode}
              onChange={(e) => handleInputChange(e.target.value, setPostalCode)}
              readOnly
              disabled={isLoading}
            />
          </form>
        </FormContainerWrapper>
      </OrderFormContainer>
    </Section>
  );
};

const Section = styled.section`
  display: flex;
  flex-direction: column;
  height: calc(100% - 40px);
  padding: 20px;
`;

const OrderFormContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-inline: 1em;
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
const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 50px;
  top: 50px;
  left: calc(50% - 100px);
`;
export default MyAdresses;

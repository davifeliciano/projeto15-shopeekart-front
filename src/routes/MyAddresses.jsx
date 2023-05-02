import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import useTheme from "../hooks/useTheme";
import FormContainerWrapper from "../components/FormContainer";
import ErrWrapper from "../components/Err";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const MyAdresses = () => {
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
  const errRef = useRef();
  const axiosPrivate = useAxiosPrivate();

  const handleInputChange = (value, setFunction) => {
    !clearErrMsg && setClearErrMsg(true);
    setFunction(value);
  };

  const setInputInitialValues = () => {
    lastOrderData?.firstName && setFirstName(lastOrderData.firstName)
    lastOrderData?.lastName && setLastName(lastOrderData.lastName)
    lastOrderData?.cpf && setCpf(lastOrderData.cpf)
    lastOrderData?.phone && setPhone(lastOrderData.phone)
    lastOrderData?.address && setAddress(lastOrderData.address)
    lastOrderData?.city && setCity(lastOrderData.city)
    lastOrderData?.uf && setUf(lastOrderData.uf)
    lastOrderData?.country && setCountry(lastOrderData.country)
    lastOrderData?.postalCode && setPostalCode(lastOrderData.postalCode)
  }

  useEffect(() => {
    const getLastOrder = async () => {
      try {
        const response = await axiosPrivate("/orders/last");
        console.log(response);
        if (response.status === 204) return null;
        setLastOrderData(response.data);
        setInputInitialValues();
        return response;
      } catch (err) {
        console.log(err);
        return null;
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
              />
              <RightInput
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => handleInputChange(e.target.value, setLastName)}
              />
            </HorizontalContainer>
            <input
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => handleInputChange(e.target.value, setCpf)}
            />

            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => handleInputChange(e.target.value, setPhone)}
            />
            <input
              type="text"
              placeholder="Full Address"
              value={address}
              onChange={(e) => handleInputChange(e.target.value, setAddress)}
            />
            <HorizontalContainer>
              <LeftInput
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => handleInputChange(e.target.value, setCity)}
              />
              <input
                type="text"
                placeholder="UF"
                value={uf}
                onChange={(e) => handleInputChange(e.target.value, setUf)}
              />
              <RightInput
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => handleInputChange(e.target.value, setCountry)}
              />
            </HorizontalContainer>
            <input
              type="text"
              placeholder="Postal Code"
              value={postalCode}
              onChange={(e) => handleInputChange(e.target.value, setPostalCode)}
            />
            <button>Save</button>
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
export default MyAdresses;

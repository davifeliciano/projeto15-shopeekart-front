import React from "react";
import styled from "styled-components";
import useTheme from "../hooks/useTheme";
import amex from "../assets/amex.png";
import boleto from "../assets/boleto.png";
import elo from "../assets/elo.png";
import hipercard from "../assets/hipercard.png";
import mastercard from "../assets/mastercard.png";
import pix from "../assets/pix.png";
import visa from "../assets/visa.png";

const Footer = () => {
  const { colors } = useTheme();
  return (
    <FooterContainer>
      <Line colors={colors} />
      <Payment>
        <Img src={visa} alt="visa" />
        <Img src={mastercard} alt="mastercard" />
        <Img src={hipercard} alt="hipercard" />
        <Img src={elo} alt="elo" />
        <Img src={amex} alt="american express" />
        <Img src={boleto} alt="boleto" />
        <Img src={pix} alt="pix" />
      </Payment>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 140px;
`;
const Line = styled.div`
  width: 100%;
  height: 5px;
  background-color: ${(props) => props.colors.primary};
`;
const Img = styled.img``;
const Payment = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
`;

export default Footer;

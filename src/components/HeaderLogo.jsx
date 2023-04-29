import styled from "styled-components";
import logo from "../assets/logowhite.svg";

const HeaderLogo = () => {
  return (
    <LogoContainer>
      <img src={logo} width="512" height="593" alt="Shopeekart Logo" />
      <h1>Shopkart</h1>
    </LogoContainer>
  );
};

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  height: 100%;
  margin-bottom: 10px;

  & img {
    height: 100%;
    width: auto;
    -webkit-user-drag: none;
  }

  & h1 {
    margin-top: 15px;
    font-family: "Comfortaa", cursive;
    font-size: 30px;
  }
`;

export default HeaderLogo;

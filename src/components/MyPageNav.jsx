import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useTheme from "../hooks/useTheme";
import male from "../assets/maleMenu";
import female from "../assets/femaleMenu";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const MyPageNav = () => {
  const [sex, setSex] = useState("male");
  const [shownName, setShownName] = useState("");
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const words = auth.name.split(" ");
    if (words.length === 1) {
      setShownName(words[0]);
    } else {
      setShownName(words[0] + " " + words[words.length - 1]);
    }
  }, [auth]);

  const { colors } = useTheme();
  return (
    <Nav colors={colors}>
      <UserContainer>
        <img src={auth.avatar} alt="Avatar" />
        <span>{shownName}</span>
      </UserContainer>
      <MyAccountContainer colors={colors}>
        <div>
          <img src={sex === "male" ? male : female} alt="Menu" />
        </div>
        <div>
          <div>
            <strong onClick={() => navigate("/user/account/profile")}>My Account</strong>
          </div>
          <div onClick={() => navigate("/user/account/profile")}>
            My profile
          </div>
          <div onClick={() => navigate("/user/account/addresses")}>
            Addresses
          </div>
          <div onClick={() => navigate("/user/account/password")}>
            Change password
          </div>
        </div>
      </MyAccountContainer>
      <MyPurchaseContainer colors={colors}>
        <img src={sex === "male" ? male : female} alt="Menu" />
        <strong onClick={() => navigate("/user/purchase")}>My Purchase</strong>
      </MyPurchaseContainer>
    </Nav>
  );
};

const Nav = styled.nav`
  background-color: ${(props) => props.colors.backgroundAside};
  width: 200px;
  height: calc(100dvh - 250px);
  position: fixed;
  bottom: 140px;
  left: 50px;

  & > img {
    margin: 20px 0;
  }
`;
const UserContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;

  img {
    width: 50px;
  }
  span {
    font-size: 20px;
    text-align: center;
    font-weight: 700;
  }
`;

const MyAccountContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: flex-start;

  div {
    * {
      margin: 10px 0;
    }
  }
  & > div:nth-child(2) {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    margin-top: 10px;

    & > div {
      :hover {
        cursor: pointer;
        color: ${(props) => props.colors.primary};
      }
    }
    strong {
      font-size: 20px;
      font-weight: 700;
    }
  }
`;

const MyPurchaseContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 10px;

  strong {
    font-size: 20px;
    font-weight: 700;
    margin-left: 10px;
    :hover {
      cursor: pointer;
      color: ${(props) => props.colors.primary};
    }
  }
`;
export default MyPageNav;

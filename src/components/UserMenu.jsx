import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import useTheme from "../hooks/useTheme";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const UserMenu = (props) => {
  const { colors } = useTheme();
  const axiosPrivate = useAxiosPrivate();
  const { auth, setAuth } = useAuth();
  const { isMenuOpen, setIsMenuOpen } = props;
  const [closeTimeout, setCloseTimeout] = useState(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      await axiosPrivate.post("/logout");
      setAuth("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleContainerMouseLeave = (event) => {
    setCloseTimeout(
      setTimeout(() => {
        setIsMenuOpen(false);
        setCloseTimeout(null);
      }, 500)
    );
  };

  const handleMenuMouseEnter = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setIsMenuOpen(true);
  };

  useEffect(() => {
    return () => {
      if (closeTimeout) {
        clearTimeout(closeTimeout);
        setCloseTimeout(null);
      }
    };
  }, []);

  return (
    <Span onMouseEnter={handleMenuMouseEnter}>
      <Img src={auth.avatar} alt="Avatar" />
      {auth.name.split(" ")[0]}

      {isMenuOpen && (
        <>
          <UserMenuContainer
            onMouseLeave={handleContainerMouseLeave}
            ref={containerRef}
            colors={colors}
          >
            <div onClick={() => navigate("/myaccount")}>My Account</div>
            <div /* onClick={() => navigate("/mypurchase")} */>My Purchase</div>
            <div onClick={handleLogout}>Logout</div>
          </UserMenuContainer>
        </>
      )}
    </Span>
  );
};

const UserMenuContainer = styled.div`
  position: fixed;
  top: 32px;
  right: 10px;
  width: 200px;
  height: 134px;
  background-color: ${(props) => props.colors.background};
  padding: 10px 0;
  z-index: 1;
  border-radius: 20px;
  border: 2px solid ${(props) => props.colors.primary};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  z-index: 100;

  &::before {
    content: "";
    position: absolute;
    top: -19px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent ${(props) => props.colors.background}
      transparent;
  }

  div {
    margin: 10px;
    height: 32px;
    border-radius: 15px;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: default;

    :hover {
      background-color: ${(props) => props.colors.secondary};
    }
  }
`;
const Span = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  position: fixed;
  top: 2px;
  right: 15px;
  width: 200px;

  * {
    margin-right: 6px;
  }
`;
const Img = styled.img`
  width: 25px;
`;
export default UserMenu;

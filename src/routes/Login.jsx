import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import MainContainerWrapper from "../components/SignRoutesContainer";
import FormContainerWrapper from "../components/FormContainer";
import ErrWrapper from "../components/Err";
import { axiosPrivate } from "../api/axios";
import useAuth from "../hooks/useAuth";
import useInput from "../hooks/useInput";
import useToggle from "../hooks/useToggle";
import styled from "styled-components";
import useTheme from "../hooks/useTheme";

const Login = () => {
  const [email, resetEmail, emailAttribs] = useInput("email", "");
  const [check, toggleCheck] = useToggle("persist", false);
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { colors } = useTheme();
  const emailRef = useRef();
  const errRef = useRef();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.pathname !== "/login" ? location.pathname : "/";
  useEffect(() => {
    if (!check) {
        resetEmail();
        localStorage.removeItem("email");
    }
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setErrMsg("Invalid email");
      return;
    }
    if (password.length < 6) {
      setErrMsg("Password must have at least 6 characters");
      return;
    }

    const body = { email, pwd: password };

    try {
      const response = await axiosPrivate.post("/login", body);
      setAuth({
        name: response.data.name,
        accessToken: response.data.accessToken,
      });

      if (!check) resetEmail();

      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing E-mail or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <MainContainerWrapper>
      <FormContainerWrapper>
        <h1>Login</h1>
        <ErrWrapper status={errMsg ? "errmsg" : "offscreen"}>
          <span ref={errRef}>{errMsg}</span>
        </ErrWrapper>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="E-mail"
            ref={emailRef}
            {...emailAttribs}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <CheckboxContainer>
            <StyledCheckbox
              type="checkbox"
              id="persist"
              onChange={toggleCheck}
              checked={check}
              colors={colors}
            />
            <CheckboxLabel htmlFor="persist">Trust this device</CheckboxLabel>
          </CheckboxContainer>
          <button>Login</button>
        </form>
        <p>
          <Link to="/signup">
            New to Shopeekart? <strong>Sign Up</strong>
          </Link>
        </p>
      </FormContainerWrapper>
    </MainContainerWrapper>
  );
};
const StyledCheckbox = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid ${(props) => props.colors.borderInputs};
  border-radius: 4px;
  background-color: ${(props) =>
    props.checked ? props.colors.primary : "white"};
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  outline: none;
  position: relative;
  cursor: pointer;

  &::after {
    content: "${(props) => (props.checked ? "o" : "")}";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    font-weight: bold;
    color: ${(props) => (props.checked ? "white" : "transparent")};
  }
  &:not(:checked):focus {
    background-color: ${(props) => props.colors.secondary};
    border-color: ${(props) => props.colors.primary};
  }
  &:checked:focus {
    border-color: ${(props) => props.colors.primary};
  }
`;
const CheckboxContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const CheckboxLabel = styled.label`
  margin-left: 8px;
  height: 24px;
  display: flex;
  align-items: center;
`;
export default Login;

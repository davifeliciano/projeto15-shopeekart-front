import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainContainerWrapper from "../components/SignRoutesContainer";
import FormContainerWrapper from "../components/FormContainer";
import ErrWrapper from "../components/Err";
import { axiosPrivate } from "../api/axios";
import styled from "styled-components";
import useTheme from "../hooks/useTheme";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const { colors } = useTheme();
  const emailRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    setErrMsg("");
  }, [email]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) return setErrMsg("Missing E-mail");
    if (!emailRegex.test(email)) {
      return setErrMsg("Invalid email");
    }
    try {
      await axiosPrivate.post("/password/reset", { email });
      setShowSuccess(true);
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing E-mail");
      } else if (err.response?.status === 404) {
        setErrMsg("No account linked to this email");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <MainContainerWrapper>
      <FormContainerWrapper>
        <h1>Reset Password</h1>
        <ErrWrapper status={errMsg ? "errmsg" : "offscreen"}>
          <span ref={errRef}>{errMsg}</span>
        </ErrWrapper>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="E-mail"
            ref={emailRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button>Reset Password</button>
        </form>
        <br />
        <p>
          When resetting your password, an email will be sent with the new
          password so you can login. Remember to change the new password on the
          My Account page after logging in
        </p>
        <p>
          <Link to="/signup">
            New to Shopeekart? <strong>Sign Up</strong>
          </Link>
        </p>
        <p>
          <Link to="/login">
            Remember your password? <strong>Login</strong>
          </Link>
        </p>
      </FormContainerWrapper>
      {showSuccess && (
        <>
          <HidderContainer />
          <SuccessMsgContainer colors={colors}>
            <h1>Password reseted</h1>
            <p>
              Your password was reset successfully. Check your email to get your
              new password
            </p>
            <button onClick={() => navigate("/login", { replace: true })}>
              Click here to login
            </button>
          </SuccessMsgContainer>
        </>
      )}
    </MainContainerWrapper>
  );
};
const HidderContainer = styled.div`
  width: 500px;
  height: 500px;
  background-color: black;
  opacity: 0.6;
  position: absolute;
  border-radius: 20px;
`;
const SuccessMsgContainer = styled.div`
  width: 260px;
  height: 260px;
  background-color: white;
  position: absolute;
  border-radius: 20px;
  padding: 20px;

  h1 {
    font-size: 1.7rem;
    margin-bottom: 75px;
    text-align: center;
    letter-spacing: 1px;
    color: ${(props) => props.colors.h1};
  }
  p {
    text-align: center;
    margin-bottom: 75px;
    color: ${(props) => props.colors.mainText};
    text-decoration: none;
    text-align: center;
  }
  button {
    width: 100%;
    height: 36px;
    border-radius: 15px;
    border: 0;
    box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.2);
    background-image: radial-gradient(
      circle at center,
      ${(props) => props.colors.backgroundUpHeader + "B1"} 0,
      ${(props) => props.colors.backgroundDownHeader + "B1"} 100%
    );
    font-size: 18px;
    color: white;
    cursor: pointer;
  }

  button:hover,
  button:focus {
    background-image: radial-gradient(
      circle at center,
      ${(props) => props.colors.backgroundUpHeader} 0,
      ${(props) => props.colors.backgroundDownHeader} 100%
    );
  }
`;
export default Reset;

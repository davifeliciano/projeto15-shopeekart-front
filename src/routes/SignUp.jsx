import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormContainerWrapper from "../components/FormContainer";
import MainContainerWrapper from "../components/SignRoutesContainer";
import ErrWrapper from "../components/Err";
import { axiosPrivate } from "../api/axios";
import useTheme from "../hooks/useTheme";
import { ThreeDots } from 'react-loader-spinner';
import styled from "styled-components";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const nameRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const { colors } = useTheme();

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [name, email, password, confirmPassword]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
      setErrMsg("Full name is missing");
      return;
    }
    if (!emailRegex.test(email)) {
      setErrMsg("Invalid email");
      return;
    }
    if (password !== confirmPassword) {
      setErrMsg("Passwords dont match");
      return;
    }
    if (password.length < 6) {
      setErrMsg("Passwords must have at least 6 characters");
      return;
    }

    const body = { name, email, pwd: password };

    try {
      await axiosPrivate.post("/register", body);

      navigate("/login", { replace: true });
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Name, email or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else if (err.response?.status === 409) {
        setErrMsg("E-mail already in use");
      } else {
        setErrMsg("Sign up Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <MainContainerWrapper colors={colors}>
      <FormContainerWrapper>
        <h1>Sign Up</h1>
        <ErrWrapper status={errMsg ? "errmsg" : "offscreen"}>
          <span ref={errRef}>{errMsg}</span>
        </ErrWrapper>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full name"
            ref={nameRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
          />
          <input
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
          />
          <button disabled={isLoading}>
          {isLoading ?
            <Span><ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#FFFFFF"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            /></Span>
            :
            "Sign Up"}
        </button>
        </form>
        <p>By signing up, you agree to Shopeekart's policies.</p>
        <p>
          <Link to="/login">
            Already Registered? <strong>Login</strong>
          </Link>
        </p>
      </FormContainerWrapper>
    </MainContainerWrapper>
  );
};
const Span = styled.span`
    width: 100%;
    height: 24px;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

export default SignUp;

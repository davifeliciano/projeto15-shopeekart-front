import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FormContainerWrapper, ErrWrapper } from "../styles/GlobalStyle";
import { axiosPrivate } from "../api/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const emailRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const location =  useLocation();
  const from = (location.pathname !== "/login") ? location.pathname : "/";
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      setErrMsg("Invalid email");
      return;
    }
    if (password.length < 6){
      setErrMsg("Password must have at least 6 characters");
      return;
    }

    const body = { email, pwd: password };

    try {
      await axiosPrivate.post(from, body);

      navigate("/", { replace: true });
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
    <main>
      <FormContainerWrapper>
        <h1>Login</h1>
        <ErrWrapper
          status={errMsg ? "errmsg" : "offscreen"}
        >
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
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Login</button>
        </form>
        <p>
          <Link to="/signup">
          New to Shopeekart? <strong>Sign Up</strong>
          </Link>
        </p>
      </FormContainerWrapper>
    </main>
  );
};

export default Login;

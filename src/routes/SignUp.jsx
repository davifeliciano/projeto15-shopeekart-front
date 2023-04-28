import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormContainerWrapper, ErrWrapper } from "../styles/GlobalStyle";
import { axiosPrivate } from "../api/axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const nameRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [name, email, password, confirmPassword]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!name) {
      setErrMsg("Full name is missing");
      return;
    }
    if (!emailRegex.test(email)) {
      setErrMsg("Invalid email");
      setEmail("");
      return;
    }
    if (password !== confirmPassword ) {
      setErrMsg("Passwords dont match");
      setPassword("");
      setConfirmPassword("");
      return;
    }
    if (password.length < 6){
      setErrMsg("Passwords must have at least 6 characters");
      setPassword("");
      setConfirmPassword("");
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
        setErrMsg("E-mail already in use")
      } else {
        setErrMsg("Register Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <main>
      <FormContainerWrapper>
        <h1>Sign Up</h1>
        <ErrWrapper
          status={errMsg ? "errmsg" : "offscreen"}
        >
          <span ref={errRef}>{errMsg}</span>
        </ErrWrapper>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full name"
            ref={nameRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button>Cadastrar</button>
        </form>
        <p>By signing up, you agree to Shopeekart's policies.</p>
        <p>
          <Link>
            Already Registered? <strong>Login</strong>
          </Link>
        </p>
      </FormContainerWrapper>
    </main>
  );
};

export default SignUp;

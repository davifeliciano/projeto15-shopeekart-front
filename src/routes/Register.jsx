import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormContainerWrapper, ErrWrapper } from "../styles/GlobalStyle";
import { axiosPrivate } from "../api/axios";

const Register = () => {
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

    const body = { name, email, pwd: password };

    try {
      await axiosPrivate.post("/register", body);

      navigate("/login", { replace: true });
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Register Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <main>
      <FormContainerWrapper>
        <h1>Cadastrar</h1>
        <ErrWrapper
          status={errMsg ? "errmsg" : "offscreen"}
        >
          <span ref={errRef}>{errMsg}</span>
        </ErrWrapper>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome completo"
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
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirmar senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button>Cadastrar</button>
        </form>
        <p>Ao se inscrever, você concorda com as políticas da Shopeekart.</p>
        <p>
          <Link>
            Tem uma Conta? <strong>Entre</strong>
          </Link>
        </p>
      </FormContainerWrapper>
    </main>
  );
};

export default Register;

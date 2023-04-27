import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useTheme from "../hooks/useTheme";
import { FormContainerWrapper, ErrWrapper } from "../styles/GlobalStyle";

const Register = () => {
  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState('');
  const nameRef = useRef();
  const errRef = useRef();
  const nav = useNavigate();

  useEffect(() => {
    nameRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [name, email, password, confirmPassword])
  return (
    <main>
      <FormContainerWrapper>
        <h1>Cadastrar</h1>
        <ErrWrapper ref={errRef} status={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg} </ErrWrapper>
        <form>
          <input type="text" placeholder="Nome completo" ref={nameRef} />
          <input type="text" placeholder="E-mail" />
          <input type="password" placeholder="Senha" />
          <input type="password" placeholder="Confirmar senha" />
          <button>Cadastrar</button>
        </form>
        <p>Ao se inscrever, você concorda com as políticas da Shopeekart.</p>
        <Link>
          Tem uma Conta? <strong>Entre</strong>
        </Link>
      </FormContainerWrapper>
    </main>
  );
};



export default Register;

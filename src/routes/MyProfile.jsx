import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import FormContainerWrapper from "../components/FormContainer";
import ErrWrapper from "../components/Err";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

const MyProfile = () => {
  const { auth } = useAuth();
  const [name, setName] = useState(auth.name);
  const [email, setEmail] = useState(auth.email);
  const [avatar, setAvatar] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [clearErrMsg, setClearErrMsg] = useState(true);

  const errRef = useRef();
  const axiosPrivate = useAxiosPrivate();

  const handleInputChange = (value, setFunction) => {
    !clearErrMsg && setClearErrMsg(true);
    setFunction(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = { name, email, avatar };
    console.log(body);
    await axiosPrivate.put("user/edit", body);
    window.location.reload();
  };

  useEffect(() => {
    if (clearErrMsg) setErrMsg("");
  }, [name, email, avatar]);
  return (
    <Section>
      <OrderFormContainer>
        <FormContainerWrapper>
          <h1>My Profile</h1>
          <ErrWrapper status={errMsg ? "errmsg" : "offscreen"}>
            <span ref={errRef}>{errMsg}</span>
          </ErrWrapper>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => handleInputChange(e.target.value, setName)}
            />

            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => handleInputChange(e.target.value, setEmail)}
            />
            <input
              type="text"
              placeholder="New Avatar"
              value={avatar}
              onChange={(e) => handleInputChange(e.target.value, setAvatar)}
            />
            <img src={auth.avatar} alt="avatar" />
            <button>Save</button>
          </form>
        </FormContainerWrapper>
      </OrderFormContainer>
    </Section>
  );
};

const Section = styled.section`
  display: flex;
  flex-direction: column;
  height: calc(100% - 40px);
  padding: 20px;
`;

const OrderFormContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-inline: 1em;

  img {
    margin: 20px;
    width: 120px;
    height: 120px;
  }
`;

export default MyProfile;

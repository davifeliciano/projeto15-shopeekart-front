import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import useTheme from "../hooks/useTheme";
import FormContainerWrapper from "../components/FormContainer";
import password from "../assets/password";
import ErrWrapper from "../components/Err";

const MyPassword = () => {
  const { colors } = useTheme();
  const [pwd, setPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmNewPwd, setConfirmNewPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(pwd, newPwd, confirmNewPwd)

    if (pwd.length < 6) return setErrMsg("Password must have at least 6 characters")
    if (newPwd.length < 6) return setErrMsg("Password must have at least 6 characters")
    if (newPwd !== confirmNewPwd) return setErrMsg("New passwords dont match")
  };

  useEffect(() => {
    setErrMsg("");
  }, [pwd, newPwd, confirmNewPwd]);
  return (
    <Section>
      <H1>Change Password</H1>
      <Line colors={colors} />
      <Container>
        <FormContainerWrapper flexGrow={1}>
          <ErrContainer>
            <ErrWrapper
              status={errMsg ? "errmsg" : "offscreen"}
              posTop={"15px"}
            >
              <span ref={errRef}>{errMsg}</span>
            </ErrWrapper>
          </ErrContainer>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Old Password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmNewPwd}
              onChange={(e) => setConfirmNewPwd(e.target.value)}
            />
            <button>Change Password</button>
          </form>
          <LockerDiv>
            <img src={password} alt="password" />
          </LockerDiv>
        </FormContainerWrapper>
      </Container>
    </Section>
  );
};

const Section = styled.section`
  display: flex;
  flex-direction: column;
  height: calc(100% - 40px);
  padding: 20px;
`;
const ErrContainer = styled.div`
  height: 25px;
`;
const H1 = styled.h1`
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  margin: 20px;
`;

const Line = styled.div`
  margin: 0 50px;
  margin-bottom: 25px;
  width: calc(100% - 100px);
  height: 2px;
  background-color: ${(props) => props.colors.borderInputs};
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`;
const LockerDiv = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default MyPassword;

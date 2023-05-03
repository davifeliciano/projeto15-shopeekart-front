import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import useTheme from "../hooks/useTheme";
import FormContainerWrapper from "../components/FormContainer";
import password from "../assets/password";
import ErrWrapper from "../components/Err";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { InfinitySpin } from "react-loader-spinner";

const MyPassword = () => {
  const { colors } = useTheme();
  const [pwd, setPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmNewPwd, setConfirmNewPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [clearErrMsg, setClearErrMsg] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const errRef = useRef();
  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setClearErrMsg(false);

    try {
      if (pwd.length < 6)
        return setErrMsg("Password must have at least 6 characters");
      if (newPwd.length < 6)
        return setErrMsg("Password must have at least 6 characters");
      if (newPwd !== confirmNewPwd)
        return setErrMsg("New passwords dont match");
      if (newPwd === pwd)
        return setErrMsg("Old password cant match New password");

      setIsLoading(true);
      await axiosPrivate.post("/password/change", { pwd, newpwd: newPwd });
      setErrMsg("Password changed successfully");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Old Password or New Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else if (err.response?.status === 404) {
        setErrMsg("Problems with cookie, relogin please");
      } else {
        setErrMsg("Change password Failed");
      }
      errRef.current.focus();
    } finally {
      setPwd("");
      setNewPwd("");
      setConfirmNewPwd("");
      setIsLoading(false);
    }
  };

  const handleChangePwd = (e) => {
    !clearErrMsg && setClearErrMsg(true);
    setPwd(e.target.value);
  };
  const handleChangeNewPwd = (e) => {
    !clearErrMsg && setClearErrMsg(true);
    setNewPwd(e.target.value);
  };
  const handleChangeConfirmNewPwd = (e) => {
    !clearErrMsg && setClearErrMsg(true);
    setConfirmNewPwd(e.target.value);
  };

  useEffect(() => {
    if (clearErrMsg) setErrMsg("");
  }, [pwd, newPwd, confirmNewPwd]);
  return (
    <Section>
      <H1>Change Password</H1>

      <Line colors={colors} />
      <Container>
        <FormContainerWrapper flexGrow={1}>
          {isLoading && (
            <LoaderContainer>
              <InfinitySpin width="200" color={colors.primary} />
            </LoaderContainer>
          )}
          <ErrContainer>
            <ErrWrapper
              status={
                errMsg
                  ? errMsg === "Password changed successfully"
                    ? "success"
                    : "errmsg"
                  : "offscreen"
              }
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
              onChange={(e) => handleChangePwd(e)}
              disabled={isLoading}
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPwd}
              onChange={(e) => handleChangeNewPwd(e)}
              disabled={isLoading}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmNewPwd}
              onChange={(e) => handleChangeConfirmNewPwd(e)}
              disabled={isLoading}
            />
            <button disabled={isLoading}>Change Password</button>
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
  max-height: 570px;
`;
const LockerDiv = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 50px;
  top: 10px;
  left: calc(50% - 100px);
`;
export default MyPassword;

import React from "react";
import styled from "styled-components";
import useTheme from "../hooks/useTheme";
import FormContainerWrapper from "../components/FormContainer";
import password from "../assets/password";

const MyPassword = () => {
  const { colors } = useTheme();
  return (
    <section>
      <H1>Change Password</H1>
      <Line colors={colors} />
      <Container>
        <FormContainerWrapper>
            <form>
            <input type="password" placeholder="Old Password" />
            <input type="password" placeholder="New Password"/>
            <input type="password" placeholder="Confirm New Password"/>
            <button>Change Password</button>
            <br/><br/><br/><br/><br/>
            <img src={password} alt="password" />
            </form>
        </FormContainerWrapper>
      </Container>
    </section>
  );
};

const H1 = styled.h1`
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  margin: 20px;
`;

const Line = styled.div`
  margin: 0 50px;
  width: calc(100% - 100px);
  height: 2px;
  background-color: ${(props) => props.colors.borderInputs};
`;
const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 570px;

`
export default MyPassword;

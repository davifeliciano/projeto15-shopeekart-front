import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import FormContainerWrapper from "../components/FormContainer";
import ErrWrapper from "../components/Err";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { ThreeDots } from "react-loader-spinner";
import useTheme from "../hooks/useTheme";

const MyProfile = () => {
  const { auth } = useAuth();
  const [name, setName] = useState(auth.name);
  const [email, setEmail] = useState(auth.email);
  const [avatar, setAvatar] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [clearErrMsg, setClearErrMsg] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { colors } = useTheme();

  const errRef = useRef();
  const axiosPrivate = useAxiosPrivate();

  const handleInputChange = (value, setFunction) => {
    !clearErrMsg && setClearErrMsg(true);
    setFunction(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = { name, email, avatar };
    setIsLoading(true)
    try {
    await axiosPrivate.put("user/edit", body);
    window.location.reload();
    }
    catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
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
              disabled={isLoading}
            />

            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => handleInputChange(e.target.value, setEmail)}
              disabled={isLoading}
            />
            <input
              type="text"
              placeholder="New Avatar"
              value={avatar}
              onChange={(e) => handleInputChange(e.target.value, setAvatar)}
              disabled={isLoading}
            />
            <img src={auth.avatar} alt="avatar" />
            <button disabled={isLoading}>
            {isLoading ? (
              <Span>
                <ThreeDots
                  height="80"
                  width="80"
                  radius="9"
                  color={colors.primary}
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              </Span>
            ) : (
              "Save"
            )}
          </button>
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
const Span = styled.span`
  width: 100%;
  height: 24px;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default MyProfile;

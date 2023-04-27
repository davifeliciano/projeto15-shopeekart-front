import styled, { createGlobalStyle, css } from "styled-components";
import useTheme from "../hooks/useTheme";

const GlobalStyle = createGlobalStyle`

  body {
    background: linear-gradient(to bottom, ${(props) =>
      props.colors.backgroundUp}, ${(props) => props.colors.backgroundDown});

  }
  main {
  background-image: 
  radial-gradient(circle at center, 
    ${(props) => props.colors.backgroundDownHeader} 0, 
    ${(props) => props.colors.backgroundUpHeader} 100%
  );
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  }
`;

const FormContainer = styled.div`
  width: 500px;
  height: 500px;
  background-color: white;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  h1 {
    font-size: 2rem;
    margin-bottom: 20px;
    text-align: center;
    letter-spacing: 1px;
    color: #333333;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px;

    input[type="text"],
    input[type="password"] {
      border-radius: 15px;
      width: 100%;
      height: 36px;
      border: 2px solid #ccc;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
      font-size: 18px;
      text-indent: 10px;
      margin: 8px;
      position: relative;

      ::placeholder {
        font-size: 18px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }

      :focus {
        background-color: ${(props) => props.colors.secondary};
        border-color: ${(props) => props.colors.primary};
        outline: none;
      }
    }

    button {
      width: 100%;
      height: 36px;
      margin: 8px;
      border-radius: 15px;
      border: 0;
      box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.2);
      background-color: ${(props) => props.colors.primary + "B1"};
      font-size: 18px;
      color: white;
      cursor: pointer;
    }

    button:hover,
    button:focus {
      background-color: ${(props) => props.colors.primary};
    }
  }
`;

const Err = styled.p`
  ${({ status }) =>
    status === "offscreen"
      ? css`
          position: absolute;
          left: -9999px;
        `
      : css`
          background-color: lightpink;
          color: firebrick;
          font-weight: bold;
          padding: 0.5rem;
          position: fixed;
          width: 314px;
          top: calc(50% - 144px);
          text-align: center;
          z-index: -1;
        `}
`;

const GlobalStyleWrapper = () => {
  const { colors } = useTheme();
  return <GlobalStyle colors={colors} />;
};

export const FormContainerWrapper = () => {
  const { colors } = useTheme();
  console.log(colors);
  return <FormContainer colors={colors} />;
};
export const ErrWrapper = () => {
  const { colors } = useTheme();
  return <Err colors={colors} />;
};

export default GlobalStyleWrapper;

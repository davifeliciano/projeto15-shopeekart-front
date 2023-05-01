import styled from "styled-components";
import useTheme from "../hooks/useTheme";

const FormContainer = styled.div`
  width: ${props => props?.width ? props.width : "500px" };
  height: ${props => props?.flexGrow ? "auto" : props?.height ? props.height : "500px" };
  background-color: white;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  position: relative;
  flex-grow: ${props => props?.flexGrow ? 1 : 0};

  h1 {
    font-size: 2rem;
    margin-bottom: 20px;
    margin-top: 10px;
    text-align: center;
    letter-spacing: 1px;
    color: ${(props) => props.colors.h1};
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px 30px 0px 30px;

    input[type="text"],
    input[type="password"] {
      border-radius: 15px;
      width: 100%;
      height: 36px;
      border: 2px solid ${(props) => props.colors.borderInputs};
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
      font-size: 18px;
      text-indent: 10px;
      margin: 8px;
      position: relative;

      :focus {
        background-color: ${(props) => props.colors.secondary};
        border-color: ${(props) => props.colors.primary};
        outline: none;
      }

      ::placeholder {
        font-size: 18px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    button {
      width: 100%;
      height: 36px;
      margin: 8px;
      border-radius: 15px;
      border: 0;
      box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.2);
      background-image: radial-gradient(
        circle at center,
        ${(props) => props.colors.backgroundUpHeader + "B1"} 0,
        ${(props) => props.colors.backgroundDownHeader + "B1"} 100%
      );
      font-size: 18px;
      color: white;
      cursor: pointer;
    }

    button:hover,
    button:focus {
      background-image: radial-gradient(
        circle at center,
        ${(props) => props.colors.backgroundUpHeader} 0,
        ${(props) => props.colors.backgroundDownHeader} 100%
      );
    }
  }

  p {
    text-align: center;
    margin-bottom: 32px;
  }
  a {
    color: ${(props) => props.colors.mainText};
    text-decoration: none;
    text-align: center;

    &:hover {
      text-decoration: underline;
    }
  }
  strong {
    font-weight: 700;
    color: ${(props) => props.colors.primary};
  }
`;

export const FormContainerWrapper = ({ children, height, width, flexGrow }) => {
  const { colors } = useTheme();
  return <FormContainer colors={colors} height={height} width={width} flexGrow={flexGrow}> {children} </FormContainer>;
};

export default FormContainerWrapper;

import { createGlobalStyle } from "styled-components";
import useTheme from "../hooks/useTheme";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    background-color: ${(props) => props.colors.backgroundAside};
    color: ${(props) => props.colors.mainText};

  }
`;

const GlobalStyleWrapper = () => {
  const { colors } = useTheme();
  return <GlobalStyle colors={colors} />;
};

export default GlobalStyleWrapper;

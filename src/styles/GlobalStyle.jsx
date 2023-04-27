import { createGlobalStyle } from "styled-components";
import useTheme from "../hooks/useTheme";

const GlobalStyle = createGlobalStyle`

  body {
    font-family: 'Roboto', sans-serif;
    background: ${(props) => props.colors.backgroundAside};
    color: #000000cc
  } 
`;

const GlobalStyleWrapper = () => {
  const { colors } = useTheme();
  return <GlobalStyle colors={colors} />;
};

export default GlobalStyleWrapper;

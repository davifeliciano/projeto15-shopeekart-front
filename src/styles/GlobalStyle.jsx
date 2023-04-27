import { createGlobalStyle } from "styled-components";
import useTheme from "../hooks/useTheme";

const GlobalStyle = createGlobalStyle`

  body {
    font-family: 'Roboto', sans-serif;
    background: linear-gradient(to bottom, ${(props) =>
      props.colors.backgroundUp}, ${(props) => props.colors.backgroundDown});

  }
`;

const GlobalStyleWrapper = () => {
  const { colors } = useTheme();
  return <GlobalStyle colors={colors} />;
};

export default GlobalStyleWrapper;

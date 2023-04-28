import styled from "styled-components";
import useTheme from "../hooks/useTheme";

const MainContainer = styled.main`
  background-image: radial-gradient(
    circle at center,
    ${(props) => props.colors.backgroundDownHeader} 0,
    ${(props) => props.colors.backgroundUpHeader} 100%
  );
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MainContainerWrapper = ({ children }) => {
  const { colors } = useTheme();
  return <MainContainer colors={colors}>{children}</MainContainer>;
};

export default MainContainerWrapper;

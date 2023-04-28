import styled, { css } from "styled-components";
import useTheme from "../hooks/useTheme";

const Err = styled.p`
  ${({ status }) =>
    status === "offscreen"
      ? css`
          position: absolute;
          left: -9999px;
        `
      : css`
          background-color: ${(props) => props.colors.primary + "55"};
          color: firebrick;
          font-weight: bold;
          font-size: 22px;
          position: fixed;
          width: 450px;
          height: 36px;
          top: 225px;
          left: calc(50% - 225px);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
`;

export const ErrWrapper = ({ children, status }) => {
  const { colors } = useTheme();
  return (
    <Err colors={colors} status={status} aria-live="assertive">
      {children}
    </Err>
  );
};

export default ErrWrapper;

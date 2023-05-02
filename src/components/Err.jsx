import styled, { css } from "styled-components";
import useTheme from "../hooks/useTheme";

const Err = styled.p`
  ${({ status }) =>
    status === "offscreen"
      ? css`
          position: absolute;
          left: -9999px;
        `
      : status === "errmsg"
      ? css`
          background-color: ${(props) => props.colors.primary + "55"};
          color: firebrick;
          font-weight: bold;
          font-size: 22px;
          position: absolute;
          width: 450px;
          height: 36px;
          top: ${(props) => (props?.posTop ? props.posTop : "55px")};
          left: ${(props) =>
            props?.posLeft ? props.posLeft : "calc(50% - 225px)"};
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
        `
      : css`
          background-color: ${(props) => props.colors.success};
          color: darkgreen;
          font-weight: bold;
          font-size: 22px;
          position: absolute;
          width: 450px;
          height: 36px;
          top: ${(props) => (props?.posTop ? props.posTop : "55px")};
          left: ${(props) =>
            props?.posLeft ? props.posLeft : "calc(50% - 225px)"};
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
`;

export const ErrWrapper = ({ children, status, posLeft, posTop }) => {
  const { colors } = useTheme();
  return (
    <Err
      colors={colors}
      status={status}
      posLeft={posLeft}
      posTop={posTop}
      aria-live="assertive"
    >
      {children}
    </Err>
  );
};

export default ErrWrapper;

import styled from "styled-components";
import { BiPlus, BiMinus } from "react-icons/bi";
import useTheme from "../hooks/useTheme";

const Counter = ({ count, setCount }) => {
  const { colors } = useTheme();

  return (
    <Container colors={colors}>
      <CounterButton onClick={() => count !== 1 && setCount(count - 1)}>
        <BiMinus />
      </CounterButton>
      <Input
        colors={colors}
        type="number"
        min="1"
        value={count}
        onChange={(e) => setCount(e.target.value)}
      />
      <CounterButton onClick={() => setCount(count + 1)}>
        <BiPlus />
      </CounterButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  height: 100%;
  border: 1px solid ${(props) => props.colors.backgroundAside};
  border-radius: 3px;
`;

const CounterButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: transparent;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

const Input = styled.input`
  flex: 1;
  min-width: 0;
  height: 100%;
  text-align: center;
  background-color: transparent;
  border: none;
  border-left: 1px solid ${(props) => props.colors.backgroundAside};
  border-right: 1px solid ${(props) => props.colors.backgroundAside};
  outline: transparent;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default Counter;

import styled from "styled-components";
import { BsSearch, BsCart2 } from "react-icons/bs";
import useTheme from "../hooks/useTheme";
import { Link } from "react-router-dom";
import HeaderLogo from "./HeaderLogo";

const Header = () => {
  const { colors } = useTheme();

  return (
    <HeaderContainer colors={colors}>
      <HeaderNav>
        <Link to="/register">Register</Link>
        <HeaderNavSeparator />
        <Link to="/login">Login</Link>
      </HeaderNav>
      <HeaderMain>
        <HeaderLogo />
        <SearchForm>
          <input type="text" placeholder="Search in Shopkart" />
          <SearchButton colors={colors}>
            <BsSearch />
          </SearchButton>
        </SearchForm>
        <CartLink to="/cart">
          <BsCart2 />
        </CartLink>
      </HeaderMain>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 5px 50px;
  height: 100px;

  color: white;
  background: linear-gradient(
    to bottom,
    ${(props) => props.colors.backgroundUpHeader},
    ${(props) => props.colors.backgroundDownHeader}
  );

  & a {
    font-size: 12px;
    font-weight: 500;
  }
`;

const HeaderNav = styled.nav`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const HeaderNavSeparator = styled.div`
  height: 100%;
  width: 1px;
  background-color: white;
`;

const HeaderMain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  position: relative;
`;

const SearchForm = styled.form`
  display: flex;
  justify-self: center;
  align-items: center;
  height: 30px;
  padding: 3px;
  background-color: white;
  border-radius: 3px;
  filter: drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.15));

  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);

  & input {
    flex: 1;
    height: 100%;
    padding: 3px;
    background-color: transparent;
    border: none;
  }
`;

const SearchButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  aspect-ratio: 16 / 9;
  border: none;
  border-radius: 3px;
  background-color: ${(props) => props.colors.backgroundUpHeader};

  & svg {
    height: 20px;
    color: white;
  }
`;

const CartLink = styled(Link)`
  display: block;
  height: 100%;

  & svg {
    width: 25px;
    height: 100%;
    color: white;
  }
`;

export default Header;

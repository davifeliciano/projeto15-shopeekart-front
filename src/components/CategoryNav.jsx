import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useTheme from "../hooks/useTheme";

const CategoryNav = () => {
  const [categories, setCategories] = useState([]);
  const [searchParams] = useSearchParams();
  const { colors } = useTheme();

  useEffect(() => {
    axios
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch(console.error);
  }, []);

  return (
    <Container>
      <h2>Categories</h2>
      <CategoryContainer>
        {categories.map((category) => (
          <CategoryLink
            key={category}
            to={`/?category=${category}`}
            colors={colors}
            className={
              searchParams.get("category") === category ? "active" : ""
            }
          >
            {category}
          </CategoryLink>
        ))}
      </CategoryContainer>
    </Container>
  );
};

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 150px;
  height: 150svh;
  padding: 10px;
  overflow-y: hidden;
  background-color: white;
  border-radius: 3px;
`;

const CategoryContainer = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryLink = styled(Link)`
  display: block;
  padding: 10px;
  border-radius: 3px;

  &.active {
    background-color: ${(props) => props.colors.backgroundDownHeader};
    color: white;
  }

  &.active:not(:hover) {
    filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.15));
  }

  &:not(.active):hover {
    background-color: ${(props) => props.colors.backgroundAside};
  }
`;

export default CategoryNav;

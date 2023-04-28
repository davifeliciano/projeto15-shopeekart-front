import axios from "axios";
import styled from "styled-components";
import Header from "../components/Header";
import CategoryNav from "../components/CategoryNav";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Root = () => {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  const category = searchParams.get("category");

  useEffect(() => {
    const url = `/products/${page ?? 1}`.concat(
      category ? `?category=${category}` : ""
    );

    axios
      .get(url)
      .then((res) => setProducts(res.data))
      .catch(console.error);
  }, [page, category]);

  return (
    <>
      <Header />
      <PageContainer>
        <CategoryNav />
        <ProductsGrid>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </ProductsGrid>
      </PageContainer>
    </>
  );
};

const PageContainer = styled.div`
  display: flex;
  gap: 1em;
  padding: 10px 50px;
`;

const ProductsGrid = styled.main`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-auto-rows: 330px;
  grid-gap: 1em;
`;

export default Root;

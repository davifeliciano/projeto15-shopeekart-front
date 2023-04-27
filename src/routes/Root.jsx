import styled from "styled-components";
import Header from "../components/Header";
import CategoryNav from "../components/CategoryNav";

const Root = () => {
  return (
    <>
      <Header />
      <PageContainer>
        <CategoryNav />
      </PageContainer>
    </>
  );
};

const PageContainer = styled.div`
  display: flex;
  padding: 10px 50px;
`;

export default Root;

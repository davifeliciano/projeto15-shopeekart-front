import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import MyPageNav from "./MyPageNav";
import styled from "styled-components";
import Footer from "./Footer";

const MyPages = () => {
  return (
    <>
      <Header />
      <MyPageNav />
      <PageContainer>
        <OutletContainer>
          <Outlet />
        </OutletContainer>
      </PageContainer>
      <Footer />
    </>
  );
};

const PageContainer = styled.section`
  width: calc(100vw - 250px);
  height: calc(100dvh - 250px);
  position: fixed;
  bottom: 140px;
  right: 0;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OutletContainer = styled.div`
  background-color: white;
  height: calc(100dvh - 300px);
  width: 1000px;

  @media (max-width: 1300px) {
    width: calc(100vw - 300px);
  }
`;
export default MyPages;

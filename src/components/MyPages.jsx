import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import MyPageNav from "./MyPageNav";
import styled from "styled-components";

const MyPages = () => {
  return (
    <>
      <Header />
      <MyPageNav />
      <PageContainer><Outlet /></PageContainer>
    </>
  );
};

const PageContainer = styled.section`
    background-color: lightblue;
    width: calc(100vw - 200px);
    height: calc(100dvh - 109px);
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 0;
`
export default MyPages;

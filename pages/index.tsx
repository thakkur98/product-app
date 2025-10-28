import Footer from "@/src/components/Footer";
import NavBar from "@/src/components/Navbar";
import Head from "next/head";
import styled from "styled-components";
import Dashboard from "../src/components/Dashboard"


export default function Home() {
  return (
    <>
      <Head>
        <title>Product App</title>
        <meta name="description" content="Product listing Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainContainerStyle>
         <NavBar/>
         <Dashboard/>
         <Footer/>
      </MainContainerStyle>
    </>
  );
}

export const MainContainerStyle = styled.div`
     max-height: 100vh;
`;
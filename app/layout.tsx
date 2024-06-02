"use client";
import { gothic, voltaire } from "../lib/font";
import type { Metadata } from "next";
import Head from "next/head";
import "./globals.css";
import { Provider } from "react-redux";
import StoreProvider from "./StoreProvider";
import Nav from "components/nav";
import * as React from "react";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //const cookieName = "isLogin";
  // const cookieValue = useCookieObserver(cookieName);
  /*
  React.useEffect(() => {
    // 컴포넌트가 마운트될 때 초기 로컬 스토리지 상태 설정
    //initializeLocalStorage(cookieName);
  }, [cookieName]);
*/
  return (
    <html lang="en">
      <body
        className={`${gothic.className} bg-background text-black flex flex-col justify-center relative items-center`}
      >
        <StoreProvider count={0}>
          {" "}
          <Nav />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}

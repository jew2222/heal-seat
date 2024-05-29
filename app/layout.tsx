//"use client";
import { gothic, voltaire } from "../lib/font";
import type { Metadata } from "next";
import Head from "next/head";
import "./globals.css";
import { Provider } from "react-redux";
import StoreProvider from "./StoreProvider";
import Nav from "components/Nav";
import * as React from "react";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    template: "%s | Heal Seat",
    default: "Heal Seat",
  },
  description: "매일 Desktop 과 함께 하는 당신을 위해",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://kit.fontawesome.com/f45d796544.js"
          // crossorigin="anonymous"
        ></Script>
      </head>

      <body
        className={`${gothic.className} bg-background text-black flex justify-center`}
      >
        <Nav />
        <StoreProvider count={0}> {children}</StoreProvider>
      </body>
    </html>
  );
}

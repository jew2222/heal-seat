"use client";
import React from "react";
import Link from "next/link";
import MainLogo from "./Logo/MainLogo";
import { redirect } from "next/navigation";

const Nav = ({}) => {
  const isLogin = localStorage.getItem("isLogin");

  return (
    <nav className="absolute top-0 flex w-full min-h-72 justify-between *:font-semibold  *:nav-text">
      <MainLogo></MainLogo>
      <div className="flex gap-28">
        <Link href="/">서비스 소개</Link>
        {isLogin === "true" && <Link href="/workspace">워크스페이스</Link>}
      </div>
      {isLogin === "true" ? (
        <form action={() => {}}>
          <button className="px-4 txext-black mx-auto p-2 pt-0 ">
            로그아웃
          </button>
        </form>
      ) : (
        <Link href="/login">로그인</Link>
      )}
    </nav>
  );
};

export default Nav;

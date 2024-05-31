"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import MainLogo from "./Logo/MainLogo";
import { redirect } from "next/navigation";
import { logOut } from "app/actions";
//import useCookieObserver from "lib/cookieObserver";

const Nav = () => {
  const [isLogin, setIsLogin] = useState<string | null>("false");
  // const { cookieValue } = useCookieObserver<string | null>("isLogin");
  if (typeof window !== "undefined") {
    const result = localStorage.getItem("isLogin");
    result && setIsLogin("true");
  }

  useEffect(() => {
    console.log(" 로그인" + isLogin);
  }, [isLogin]);
  //console.log(isLogin);
  return (
    <nav className="max-w-screen-2xl  absolute top-0 flex w-full py-6 justify-between *:font-semibold  *:nav-text z-40">
      <MainLogo></MainLogo>

      <div className="flex gap-28 justify-center items-center text-center">
        <Link href="/">서비스 소개</Link>
        <Link href="/workspace">워크스페이스</Link>
      </div>

      {/* <form action={() => logOut()}>
          <button className="px-4 txext-black mx-auto p-2 pt-0 ">
            로그아웃
          </button>
        </form>
  */}
      <Link href="/login" className={`${isLogin === "true" && "invisible"}`}>
        로그인
      </Link>
    </nav>
  );
};

export default Nav;

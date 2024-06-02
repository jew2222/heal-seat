"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import MainLogo from "./Logo/MainLogo";
import { redirect } from "next/navigation";
import { logOut } from "app/actions";
import { usePathname, useRouter } from "next/navigation";

import { stat } from "fs";

const Nav = () => {
  const [state, setState] = useState<string>("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {}, []);

  useEffect(() => {
    setState(pathname);
    console.log(pathname);
  }, [pathname]);

  useEffect(() => {}, [state]);
  return (
    <nav className="max-w-screen-2xl  absolute top-0 flex w-full py-6 justify-between *:font-semibold  *:nav-text z-40">
      <MainLogo></MainLogo>

      <div className="flex gap-28 justify-center items-center text-center">
        <Link href="/">서비스 소개</Link>
        <Link href="/workspace">워크스페이스</Link>
      </div>

      {pathname !== "/login" ? (
        pathname === "/workspace" ? (
          <form action={() => logOut()}>
            <button className="px-4 txext-black mx-auto p-2 pt-0 ">
              로그아웃
            </button>
          </form>
        ) : (
          <Link href="/login">로그인</Link>
        )
      ) : (
        <div className="invisible">로그인</div>
      )}
    </nav>
  );
};

export default Nav;

import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";
import Link from "next/link";

const Nav = ({}) => {
  return (
    <nav className="flex w-full justify-between *:font-semibold  *:nav-text">
      <Link href="/">
        <h1 className="font-semibold  text-3xl">HealSeat</h1>
      </Link>
      <div className="flex gap-28  ">
        <Link href="/">서비스 소개</Link>
        <Link href="/login">워크스페이스</Link>
      </div>
      <Link href="/login">로그인</Link>
    </nav>
  );
};

export default Nav;

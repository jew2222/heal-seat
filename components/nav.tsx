import Link from "next/link";
import MainLogo from "./Logo/MainLogo";

const Nav = ({}) => {
  return (
    <nav className="absolute flex w-full justify-between *:font-semibold  *:nav-text">
      <MainLogo></MainLogo>
      <div className="flex gap-28">
        <Link href="/">서비스 소개</Link>
        <Link href="/workspace">워크스페이스</Link>
      </div>
      <Link href="/login">로그인</Link>
    </nav>
  );
};

export default Nav;

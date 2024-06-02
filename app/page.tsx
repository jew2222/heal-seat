"use client";
import Image from "next/image";
import Link from "next/link";

export default function Main() {
  return (
    <div className="screen  bg-[#E9EDE9] ">
      <div className="w-full">
        <div className="flex align-middle items-center py-10 ">
          <div className="flex-1 ">
            <h2 className="text-3xl font-bold mb-7">
              Heal Seat 은 <br />
              여러분의 Desk Work 시간을
              <br />더 건강하게 보낼 수 있게 해주는 웹 서비스입니다. <br />
            </h2>
            <h6 className="text-lg font-bold mb-6">
              많은 시간 PC와 함께 앉아 있다면
              <br />
              오늘부턴 Heal Seat과 함께 해보시는 거 어떠세요?
            </h6>
          </div>
          <div className="w-[39.125rem] h-[30.8rem] relative">
            <Image
              src="/image/main.png"
              alt="banner"
              layout="fill"
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        </div>
        <div className="flex *:content-center justify-between gap-7 *:w-[22.875rem] *:h-[20.25rem]">
          <Link
            href="/exercise/posture"
            className="main-category-btn bg-primary "
          >
            자세 교정
          </Link>
          <Link href="/exercise/eye" className="main-category-btn bg-tertiary">
            시력
          </Link>

          <Link
            href="/exercise/upper"
            className="main-category-btn bg-secondary "
          >
            상체
          </Link>
          <Link href="/exercise/lower" className="main-category-btn bg-muted ">
            하체
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import Nav from "components/Nav";
import Image from "next/image";
import { useEffect, useState } from "react";
import {} from "../actions";
import Link from "next/link";
import { getCategoryKor } from "lib/utils";
import { Video } from "types/type";
import Timer from "components/Timer/Timer";
import { findTodayTimer } from "app/actions";

export default function Workspace({ params }: { params: { id: string } }) {
  const [animate, setAnimate] = useState(false);

  const handlePlantClick = () => {
    // 애니메이션 클래스 추가
    setAnimate(true);

    // 일정 시간 후 애니메이션 클래스 제거 (재사용 가능하게)
    setTimeout(() => {
      setAnimate(false);
    }, 500); // 애니메이션 시간과 동일하게 설정
    incrementPlantStatus();
  };
  return (
    <div
      className="flex *:justify-center  min-h-screen py-16  w-full  bg-accent size-full relative inset-0 bg-no-repeat bg-cover bg-center "
      style={{ backgroundImage: `url("/image/living-room-background.jpg")` }}
    >
      <div className="w-full">
        {/*   */}

        <div className="p-4 relative ">
          <div className="absolute top-36 right-40">
            <Timer />
          </div>
        </div>
        <div className="mx-40 relative flex-col w-96 h-[57rem] items-center justify-center">
          <Image
            src="/image/leaf.png"
            alt="plant"
            onClick={handlePlantClick}
            className={`cursor-pointer left-1/2 -translate-x-1/2 absolute start-1/2 bottom-72 ${animate ? "" : ""}`}
            width={100}
            height={300}
          />
          <Image
            src="/image/pot.png"
            alt="pot"
            width={350}
            height={400}
            className={`absolute left-1/2 -translate-x-1/2 bottom-0`}
          />
        </div>
        {/*
          <div className="plant plant-two">
            <div className="stem">
              {" "}
              <Image
                src="/image/leaf.png"
                alt="plant"
                width={300}
                height={300}
              />
            </div>
          </div>
          <div className="plant plant-one">
            <div className="stem"> </div>
          </div>
       
  */}
      </div>
    </div>
  );
}

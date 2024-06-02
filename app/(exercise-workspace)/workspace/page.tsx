"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {} from "../actions";
import Link from "next/link";
import { getCategoryKor } from "lib/utils";
import { Video } from "types/type";
import Timer from "components/Timer/Timer";
import { checkLogin } from "./actions";
import { redirect } from "next/navigation";

export default function Workspace({ params }: { params: { id: string } }) {
  const [animate, setAnimate] = useState(false);

  const handlePlantClick = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 4000);
  };

  useEffect(() => {
    const user = checkLogin();
    if (!user) {
      redirect("/");
    } else {
    }
  }, []);
  return (
    <div
      className="flex *:justify-center  min-h-screen py-16  w-full  bg-accent size-full relative inset-0 bg-no-repeat bg-cover 
       bg-bottom "
      style={{ backgroundImage: `url("/image/living-room-background.jpg")` }}
    >
      <div className="w-full">
        {/*   */}

        <div className="p-4 relative ">
          <div className="absolute top-36 right-40">
            <Timer />
          </div>
        </div>
        <div className="mx-40 relative flex-col w-96 h-full items-center justify-center">
          <Image
            src="/image/leaf.png"
            alt="plant"
            onClick={handlePlantClick}
            className={`cursor-pointer left-1/2 absolute -translate-x-1/2  bottom-[30rem] ${animate ? "swaying" : ""}`}
            width={100}
            height={300}
          />
          <Image
            src="/image/pot.png"
            alt="pot"
            width={350}
            height={400}
            className={`absolute left-1/2 -translate-x-1/2 bottom-[12rem]`}
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

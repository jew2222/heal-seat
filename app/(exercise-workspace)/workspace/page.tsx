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
  const getTime = async () => {
    try {
      // const result = await findTodayTimer();
      /// if (result) {
      // }
      // result && setVideos(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getTime();
  }, []);
  return (
    <div className="flex flex-col items-center  min-h-screen py-16  *:items-center max-w-screen-2xl w-full max-h-screen bg-accent">
      <div className="w-full">
        {/*   */}
        <div className="">
          {
            <div className="p-4 relative">
              <div className="absolute top-36 right-40">
                <Timer />
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

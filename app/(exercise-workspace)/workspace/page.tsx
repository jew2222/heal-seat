"use client";

import Nav from "components/Nav";
import Image from "next/image";
import { useEffect, useState } from "react";
import {} from "../actions";
import Link from "next/link";
import { getCategoryKor } from "lib/utils";
import { Video } from "types/type";
import Timer from "components/Timer/Timer";

export default function Workspace({ params }: { params: { id: string } }) {
  const getTimer = async () => {
    try {
      // const result = await findVideo(params.id);
      //  result && setVideo(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {}, []);

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

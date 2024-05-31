"use client";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { RootState } from "lib/store"; //?
import {
  reset,
  setActive,
  increment,
  setByAmount,
} from "lib/redux/timer/timerSlice";
import { Metadata } from "next";
import { findTodayTimer, setTodayTimer } from "../../app/actions";

export default function Timer() {
  //  const [time, setTime] = useState(0); //TOdo: DB 시간으로 촟기화
  //  const [isActive, setIsActive] = useState(false);

  const time = useSelector((state: RootState) => state.timer.time);
  const isActive = useSelector((state: RootState) => state.timer.isActive);
  const dispatch = useDispatch();

  const getTodayTime = async () => {
    try {
      const result = await findTodayTimer();
      if (result) {
        setByAmount(result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getTodayTime();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        //setTime((prevTime) => prevTime + 1);
        dispatch(increment());
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  useEffect(() => {
    document.title = `${formatTime(time)} | Heal Seat`;
  }, [time]);

  useEffect(() => {
    // 페이지가 언로드될 때 타이머 데이터를 서버에 전송
    const handleUnload = () => {
      setTodayTimer(time);
      console.log("타이머 언로드");
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [time]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 rounded-xl px-10 pt-10 drop-shadow-lg shadow-sm shadow-slate-400">
      <div className="border-slate-500 border shadow-inner shadow-slate-600 drop-shadow-md rounded-xl p-4">
        <h1 className="text-3xl font-bold ">{dayjs().format("MM.DD(ddd)")}</h1>
        <div className="text-5xl font-bold m-4">{formatTime(time)}</div>
      </div>
      <div>
        <button
          className={`px-3 py-3 mx-2 my-6  text-2xl font-bold rounded ${
            isActive ? "bg-secondary" : "bg-primary"
          } text-white`}
          onClick={() => dispatch(setActive(!isActive))} // setIsActive((prev) => !prev)}
        >
          {isActive ? "Pause" : "Start"}
        </button>
        <button
          className={`px-3 py-3 mx-2 my-6 text-2xl font-bold rounded ${"bg-primary"} text-white`}
          onClick={() => dispatch(reset())} // setIsActive((prev) => !prev)}
        >
          {"Reset"}
        </button>
      </div>
    </div>
  );
}

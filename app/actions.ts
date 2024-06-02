"use server";
import db from "lib/db";
import getSession from "lib/session";
import { Metadata } from "next";
import { redirect } from "next/navigation";

const metadata: Metadata = {
  title: {
    template: "%s | Heal Seat",
    default: "Heal Seat",
  },
  description: "매일 Desktop 과 함께 하는 당신을 위해",
};

const getCookie = async () => {
  const session = await getSession();
  return session;
};

const getTodayRange = (): { start: Date; end: Date; today: Date } => {
  const today = new Date();
  const start = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const end = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );

  return { start, end, today };
};

export async function findUser() {
  const user = await db.user.findUnique({
    where: {
      id: (await getCookie()).id,
    },
  });
  return user;
}

export async function findTodayTimer() {
  const user = await findUser();
  if (user) {
    try {
      const { start, end, today } = getTodayRange();
      const data = await db.timer.findMany({
        where: {
          userId: (await getCookie()).id,
          date: today,
        },
      });
      //console.log("Today's timer 불러오기:", data && data);
      return data;
    } catch (error) {
      //console.error("타이머 데이터 불러오기 실패:", error);
      return null;
    }
  } else {
    console.log("유저 없음");
  }
}

// 타임 추가,수정 함수
export async function setTodayTimer(totalTime: number) {
  const { today } = getTodayRange();
  const userId = (await getCookie()).id;
  try {
    const updatedData = await db.timer.upsert({
      where: {
        userId_date: {
          userId,
          date: today,
        },
      },
      update: {
        totalTime,
      },
      create: {
        userId,
        totalTime,
        date: today,
      },
    });
    //console.error("타이머 데이터 수정:", updatedData);

    return updatedData;
  } catch (error) {
    //console.error("타이머 데이터 수정 실패:", error);
    return null;
  }
}

export const logOut = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/");
};

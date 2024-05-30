"use server";
import getSession from "@/lib/session";
import db from "lib/db";
import { redirect } from "next/navigation";

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
      id: 1,
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
          date: today,
        },
      });
      console.log("Today's timer:", data && data);

      // return data;
    } catch (error) {
      console.error("타이머 데이터 불러오기 실패:", error);
      return null;
    }
  } else {
    console.log("유저 없음");
  }
}

// 타임 추가 함수
export async function setTodayTimer(totalTime: number) {
  const { today } = getTodayRange();

  try {
    const userId = 1;
    const updatedData = await db.timer.upsert({
      where: {
        userId_date: {
          //유니크해야 함
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
    return updatedData;
  } catch (error) {
    console.error("Error adding time to today data:", error);
    return null;
  }
}

export const logOut = async () => {
  if (confirm("로그아웃 하시겠습니까?")) {
    const session = await getSession();
    await session.destroy();
    localStorage.removeItem("isLogin");
    redirect("/");
  }
};

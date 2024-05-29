import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { timer } = req.body;

    try {
      // 유저 ID는 세션이나 토큰으로부터 가져온다고 가정합니다
      const userId = 1; // 예시로 하드코딩한 유저 ID

      const today = new Date();
      today.setHours(0, 0, 0, 0); // 오늘 날짜로 설정

      // 오늘의 타이머 데이터를 찾거나 생성
      const timerData = await prisma.timer.upsert({
        where: {
          userId_date: {
            userId,
            date: today,
          },
        },
        update: {
          time: timer,
        },
        create: {
          userId,
          date: today,
          time: timer,
        },
      });

      res.status(200).json(timerData);
    } catch (error) {
      res.status(500).json({ error: "Failed to save timer data" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

import db from "lib/db";
import getSession from "lib/session";
import { redirect } from "next/navigation";

export const checkLogin = async () => {
  const session = await getSession();
  return session;
};

if (typeof window !== "undefined") {
  const result = localStorage.getItem("isLogin");
}

/*
// 화분 상태 업데이트
async function updatePlantStatus() {
  const plant = await db.plant.findUnique({ where: { id: plantId } });
  if (!plant) {
    throw new Error("Plant not found");
  }

  const now = new Date();
  const diffInDays =
    (now - new Date(plant.lastClickedAt)) / (1000 * 60 * 60 * 24);

  let newStatus = 5; // 기본 상태: 좋음
  if (diffInDays >= 30) {
    newStatus = 1; // 죽음
  } else if (diffInDays >= 7) {
    newStatus = 2; // 시듬
  } else if (diffInDays >= 3) {
    newStatus = 3; // 시름시름
  } else if (diffInDays >= 2) {
    newStatus = 4; // 보통
  }

  const updatedPlant = await db.plant.update({
    where: { id: plantId },
    data: {
      status: newStatus,
      lastClickedAt: now,
    },
  });

  return updatedPlant;
}


async function incrementPlantStatus() {
  /*
  const plant = await db.user.findUnique({ where: { id:  } });
  if (!plant) {
    throw new Error("Plant not found");
  }


  if (plant.status < 5) {
    const updatedPlant = await prisma.plant.update({
      where: { id: plantId },
      data: {
        status: plant.status + 1,
        lastClickedAt: new Date(),
      },
    });

    return updatedPlant;
  } else {
    return plant; // 상태가 최고치면 그대로 반환
  }
  
}
*/

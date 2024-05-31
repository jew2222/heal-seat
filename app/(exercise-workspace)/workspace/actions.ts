const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 화분 상태 업데이트
async function updatePlantStatus() {
  const plant = await prisma.plant.findUnique({ where: { id: plantId } });
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

  const updatedPlant = await prisma.plant.update({
    where: { id: plantId },
    data: {
      status: newStatus,
      lastClickedAt: now,
    },
  });

  return updatedPlant;
}

// 화분 상태 업
async function incrementPlantStatus() {
  const plant = await prisma.plant.findUnique({ where: { id: plantId } });
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

import { PrismaClient, Prisma } from "@prisma/client";

const db = new PrismaClient();

async function deleteBy(category: string) {
  try {
    const deleteResult = await db.exercise.deleteMany({
      where: {
        category,
      },
    });
  } catch (error) {
    console.error("Error deleting videos by category:", error);
  }
}

export default db;

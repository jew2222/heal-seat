import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

/*

//테스트 함수
async function test() {
  //   const user = await db.user.create({
  //     data: {
  //       username: "test",
  //     },
  //   });
  const token = await db.sMSToken.findUnique({
    where: {
      id: 1,
    },
    //관계 포함 : connect 한 테이블이 있을 경우 아래 테이블 행을 함께 보여줌
    include: {
      user: true,
    },
  });
  console.log(token);
}

test();
*/

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

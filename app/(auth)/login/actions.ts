"use server";

import bcrypt from "bcrypt";
import { z } from "zod";
import { redirect } from "next/navigation";
import getSession from "lib/session";
import db from "lib/db";

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  // if(user){
  //   return true
  // } else {
  //   return false
  // }
  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmailExists, "해당 이메일 계정이 존재하지 않습니다"),
  password: z.string({
    required_error: "비밀번호를 입력해주세요",
  }),
});

export async function logIn(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log("로그인 밸리데이션 완료" + result);
    //유저 존재시 로그인
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
    });
    const ok = await bcrypt.compare(
      //문자와 해시값 비교
      result.data.password,
      user!.password ?? "xxxx"
      //리파인 메소드를 통해 이미 유저가 있다는게 확실하다는 의미 !
      // ?? 패스워드를 가지지 않았다면 빈문자와 비교한단 의미, 항상 false
    );
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      session.userRole = user!.userRole || "";
      session.plant_status = user!.plant_status || 0;
      session.last_water_at = user!.last_water_at || undefined;
      console.log(session.userRole);
      await session.save();
      redirect("/workspace");
      //리턴이 없으면 다음 페이지로 넘어가고 로컬 스토리지에 로그인을 저장
    } else {
      return {
        //zod 대신의 용도
        fieldErrors: {
          password: ["비밀번호가 불일치합니다."],
          email: [],
        },
      };
    }
  }
}

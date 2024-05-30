"use server";

import bcrypt from "bcrypt";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

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
  // .min(PASSWORD_MIN_LENGTH),
  // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
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
      select: {
        id: true,
        password: true,
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
      await session.save();
      localStorage.setItem("isLogin", "true");
      redirect("/workspace");
    } else {
      return {
        //zod 인척 하는 용도
        fieldErrors: {
          password: ["비밀번호가 불일치합니다."],
          email: [],
        },
      };
    }
  }
}

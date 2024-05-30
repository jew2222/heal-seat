"use server";
import bcrypt from "bcrypt";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";

/*
const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);
const checkPasswords = ({ password, confirm_password }: checkPasswordType) =>
  password === confirm_password;

*/
// 밸리데이션 검사 함수
const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

//zod 스키마 정의
const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "유저네임은 문자열이어야 합니다.",
        required_error: "필수값이 입력되지 않았습니다.",
      })
      .trim(),
    email: z.string().email().toLowerCase(), // 변형 가능
    password: z.string().min(PASSWORD_MIN_LENGTH),
    // .regex(passwordRegex, "에러 안내문"), //정규식을 사용할 경우
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
    userrole: z.string(),
  })
  .superRefine(async ({ username }, ctx) => {
    //refinementCtx 인자는 에러 묶음
    //슈퍼리파인으로 DB 중복 검사
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        //에러 추가하기
        code: "custom", // 커스텀 이슈라
        message: "이름이 중복 되는 사용자가 있습니다",
        path: ["username"], // 이 옵션 없을시 폼에러,네임 써줄 시 필드 에러
        fatal: true, //치명적인 에러 란뜻 ++
      });
      return z.NEVER; // ++오류시 미리 중단하기
    }
  })
  .superRefine(async ({ email }, ctx) => {
    //전체 행 말고 원하는 데이터만 가져오기
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "중복된 이메일입니다",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(checkPasswords, {
    message: "두 비밀번호가 일치하지 않습니다.",
    path: ["confirm_password"],
  });

/* 회원가입 액션 : 벨리데이션 통과 후 db , 쿠키 저장 */
export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
    userrole: formData.get("userrole"),
  };
  const result = await formSchema.spa(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
        userRole: result.data.userrole,
      },
      select: {
        id: true,
      },
    });
    /*
    getIronSession(cookies(), {
      cookieName: "hsc",
      password: process.env.COOKIE_PASSWORD, //쿠키 암호화를 위해 사용
    });
    */
    const session = await getSession();
    /* 겟세션 함수 내용
     const session = await getIronSession(cookies(), {
    cookieName: "hsc",
      password: process.env.COOKIE_PASSWORD, //쿠키 암호화를 위해 사용
    });
    강의 에선 변수명이 세션 아닌 쿠키 
    */
    //세션쿠키에 정보 넣고 저장
    session.id = user.id;
    await session.save();
    redirect("/workspace");
  }
}

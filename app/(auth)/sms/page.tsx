"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { smsLogIn } from "./actions";

const initialState = {
  token: false,
  error: undefined,
};
/* 
1. 전화번호 받아 토큰 보내기
2. 토큰 일치 인증 */
export default function SMSLogin() {
  const [state, dispatch] = useFormState(smsLogIn, initialState);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Log in</h1>
        <h2 className="text-xl">Verify your phone number.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        {state.token ? (
          <Input
            name="token"
            type="number"
            placeholder="Verification code"
            required
            min={100000}
            max={999999}
            errors={state.error?.formErrors}

            // 폼관련 에러만 출력하는것
          />
        ) : (
          <Input
            name="phone"
            type="text"
            placeholder="Phone number"
            required
            errors={state.error?.formErrors}
          />
        )}
        <Button text={state.token ? "토큰 인증하기" : "인증 문자 보내기"} />
      </form>
    </div>
  );
}

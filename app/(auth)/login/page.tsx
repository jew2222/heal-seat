"use client";

import { useFormState } from "react-dom";
import { logIn } from "./actions";
import { PASSWORD_MIN_LENGTH } from "lib/constants";
import Input from "components/input";
import FormButton from "components/FormButton";
import MainLogo from "components/Logo/MainLogo";
import Link from "next/link";

export default function LogIn() {
  const [state, dispatch] = useFormState(logIn, null);

  return (
    <div className="screen justify-center ">
      <div className="formBox">
        <div className="*:font-medium  ">
          <MainLogo />
          <h1 className="text-3xl font-black ">
            오늘도 나의 HealSeat에
            <br />
            앉아볼까요?
          </h1>
        </div>
        <form action={dispatch} className="flex flex-col gap-7 ">
          <Input
            name="email"
            type="email"
            placeholder="Email"
            required
            errors={state?.fieldErrors?.email}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            required
            minLength={PASSWORD_MIN_LENGTH}
            errors={state?.fieldErrors.password}
          />
          <FormButton text="Log in" />
          <Link className="primary-btn " href={"/register"}>
            Register{" "}
          </Link>
        </form>
      </div>
    </div>
  );
}

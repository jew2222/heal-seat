"use client";

import { useFormState } from "react-dom";
import { createAccount } from "./actions";
import Input from "components/input";
import FormButton from "components/FormButton";
import MainLogo from "components/Logo/MainLogo";
import SelectBox from "components/SelectBox";

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);
  return (
    <div className="screen justify-center ">
      <div className="formBox">
        <div className=" *:font-medium  ">
          <MainLogo />

          <h1 className="text-xl font-black ">
            회원이 되면 당신의 워크스페이스에
            <br />
            입장할 수 있답니다
          </h1>
        </div>
        <form action={dispatch} className="flex flex-col gap-3">
          <Input
            name="username"
            type="text"
            placeholder="Username"
            required
            errors={state?.fieldErrors.username}
            minLength={3}
            maxLength={10}
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            required
            errors={state?.fieldErrors.email}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            minLength={4}
            required
            errors={state?.fieldErrors.password}
          />
          <Input
            name="confirm_password"
            type="password"
            placeholder="Confirm Password"
            required
            minLength={4}
            errors={state?.fieldErrors.confirm_password}
          />
          <SelectBox name="userrole" />{" "}
          <div className="mt-7">
            <FormButton text="회원가입" />
          </div>
        </form>
      </div>
    </div>
  );
}

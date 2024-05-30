import { ForwardedRef, SelectHTMLAttributes, forwardRef } from "react";

interface InputProps {
  name: string;
  errors?: string[];
}

const _Select = (
  {
    name,
    errors = [],
    ...rest
  }: InputProps & SelectHTMLAttributes<HTMLSelectElement>, //인풋이 제공하는 모든 프롭 받기 위함-> 타입,플레스홀더, 리콰이어 등등
  ref: ForwardedRef<HTMLSelectElement>
) => {
  return (
    <div className="relative">
      <select
        name={name}
        ref={ref}
        {...rest}
        className="text-slate-400 formInput  *:bg-white *:hover:bg-gray-100 *:text-black"
      >
        <option value="" className="text-slate-400">
          Role
        </option>
        <option value="WK">직장인</option>
        <option value="STD">학생</option>
        <option value="DVL">개발자</option>
      </select>
    </div>
  );
};

export default forwardRef(_Select);

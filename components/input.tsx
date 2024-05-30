import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";

interface InputProps {
  name: string;
  errors?: string[];
}

const _Input = (
  {
    name,
    errors = [],
    ...rest //일일히 안적어도 rest 로
  }: InputProps & InputHTMLAttributes<HTMLInputElement>, //인풋이 제공하는 모든 프롭 받기 위함-> 타입,플레스홀더, 리콰이어 등등
  ref: ForwardedRef<HTMLInputElement>
) => {
  return (
    <div className="">
      <input ref={ref} name={name} className="formInput" {...rest} />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
};

export default forwardRef(_Input);

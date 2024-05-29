"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

export default function FormButton({ text }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="primary-btn disabled:bg-zinc-300  disabled:text-zinc-500 disabled:cursor-not-allowed"
    >
      {pending ? "로딩 중" : text}
    </button>
  );
}

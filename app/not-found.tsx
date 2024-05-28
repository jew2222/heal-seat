"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <section className="flex flex-col items-center">
        <p className="text-2xl">404 - 페이지를 찾을 수 없습니다.</p>
        <button onClick={() => router.back()} className="mt-10">
          이전 페이지
        </button>
      </section>
    </div>
  );
}

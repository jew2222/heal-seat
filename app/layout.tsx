import { gothic, voltaire } from "@/lib/font";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Heal Seat",
    default: "Heal Seat",
  },
  description: "매일 Desktop 과 함께 하는 당신을 위해",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${gothic.className} bg-[#E9EDE9] text-black  flex justify-center`}
      >
        {children}
      </body>
    </html>
  );
}

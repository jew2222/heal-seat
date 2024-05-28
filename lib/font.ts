import { Gothic_A1, Voltaire } from "next/font/google";

const gothic = Gothic_A1({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal"],
  variable: "--gothic-text",
});

const voltaire = Voltaire({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  variable: "--voltaire-text",
});

export { gothic, voltaire };

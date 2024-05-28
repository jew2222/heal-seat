import exp from "constants";

export function formatToTimeAgo(date: string): string {
  const dayInMs = 1000 * 60 * 60 * 24;
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = Math.round((time - now) / dayInMs);

  const formatter = new Intl.RelativeTimeFormat("ko");

  return formatter.format(diff, "days");
}

export function formatToWon(price: number): string {
  return price.toLocaleString("ko-KR");
}

export const getCategoryKor = (cate: string): string => {
  cate = cate.toUpperCase();
  switch (cate) {
    case "UPPER":
      return "상체";
    case "LOWER":
      return "하체";
    case "EYE":
      return "시력";
    default:
      return "자세 교정";
  }
};

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

export const getCategoryKor = (cate: string) => {
  let kor;
  switch (cate) {
    case "UPPER":
      kor = "상체";

    case "LOWER":
      kor = "하체";

    case "EYE":
      kor = "시력";

    default:
      kor = "자세 교정";
  }

  return kor;
};

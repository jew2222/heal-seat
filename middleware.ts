import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

//모든 요청을 가로채는 파일
interface Routes {
  [key: string]: boolean;
}
const privateOnlyUrls: Routes = {
  "/workspace": true,
};
export async function middleware(request: NextRequest) {
  const session = await getSession();
  const privatePath = privateOnlyUrls[request.nextUrl.pathname];
  /*
    //fetch api 인터페이스 Response:: Response
  return Response.json({ //접근 막기
    error: " you are not allowed",
  });
  */
  //쿠키가 없고 프리베잇 경로인 경우
  if (!session.id) {
    if (privatePath) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    return NextResponse.next();
  }
}
//메쳐 무시
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|public|static).*)",
    "/admin/:path*", // /admin 이하 모든 경로
  ],
};

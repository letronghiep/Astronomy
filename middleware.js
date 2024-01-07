import { NextResponse } from "next/server";

export function middleware(req) {
  console.log("middleware");
  console.log("request", req.nextUrl.pathname);
  return NextResponse.redirect(new URL('/', request.url))
}
export const config = {
  matcher: "/about/:path*",
};

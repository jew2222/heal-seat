"use server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id: number;
  userRole?: string;
  plant_status?: number;
  last_water_at?: Date;
}

export default async function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "isLogin",
    password: process.env.COOKIE_PASSWORD!,
  });
}

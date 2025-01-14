import { getAccessToken } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const res = NextResponse.next();
    const { accessToken } = await getAccessToken(req, res);

    if (!accessToken) {
      return NextResponse.json({ error: "Access token is missing" });
    }

    return NextResponse.json({ accessToken });
  } catch (error) {
    console.error("Error fetching access token:", error);
    return NextResponse.json({ error: "Failed to fetch access token" }, { status: 500 });
  }
}

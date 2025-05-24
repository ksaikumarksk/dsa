import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const response = NextResponse.json({
    success: true,
    message: "Logout successful",
  })
  const isSecure = req.nextUrl.protocol === "https:";
  
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: isSecure,
    sameSite: "strict",
    maxAge: 0,
  })

  return response
}

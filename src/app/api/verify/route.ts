import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {

    console.log("all cookies",req.cookies.getAll())
    const auth = req.cookies.get("token")?.value;

    if (!auth) {
      return NextResponse.json(
        { status: 401, data: { message: "Auth failed" } },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(auth, process.env.JWT_Key as string,{ algorithms: ["HS256"] });
    console.log("decoded>>>", decoded);
    return NextResponse.json(
      { status: 200, data: decoded },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { status: 401, data: { message: "Auth failed" } },
      { status: 401 }
    );
  }
}

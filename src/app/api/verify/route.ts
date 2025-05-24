import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const auth = req.cookies.get("token")?.value;
    console.log("auth>>>", auth);

    if (!auth) {
      return NextResponse.json(
        { status: 401, data: { message: "Auth failed" } },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(auth, process.env.JWT_Key as string);
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

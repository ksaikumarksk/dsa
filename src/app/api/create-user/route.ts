
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import clientPromise from "@/lib/mongodb";
import UserModel from "@/lib/models/user";


export async function POST(req: NextRequest) {
    await clientPromise()
    try {
        const body = await req.json();
        console.log("body", body);
        const users = await UserModel.find();
        console.log("users", users);
        const existingUser = await UserModel.findOne({ email: body.email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);
        const user = new UserModel({
            _id: new mongoose.Types.ObjectId(),
            name: body.name,
            email: body.email,
            password: hashedPassword,
        });

        console.log("user", user);

        const result = await user.save();  
        console.log("result", result);
        return NextResponse.json({ message: "User created" }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
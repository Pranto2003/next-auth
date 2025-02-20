import { connect } from "@/db/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reBody = await request.json();
    const { email, password } = reBody;
    console.log(reBody);

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User doesnot exist" },
        { status: 400 }
      );
    }
    console.log("User Found");
    const validpassword = await bcrypt.compare(password, user.password);

    if (!validpassword) {
      return NextResponse.json(
        { error: "Check your credentials" },
        { status: 400 }
      );
    }

    const tokendata = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = await jwt.sign(tokendata, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({
      message: "User Logged IN",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

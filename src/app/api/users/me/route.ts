import { connect } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
  const userID = await getDataFromToken(request);
  const user = await User.findOne({ _id: userID }).select("-password");
  return NextResponse.json({
    message: "User Found",
    data: user,
  });
}

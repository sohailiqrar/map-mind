"use server";
import { connectDB } from "@/app/lib/utils/mongodb";
import User from "@/app/lib/utils/models/User";
import bcrypt from "bcryptjs";

export const register = async (values: any) => {
  const { email, password, name } = values;

  try {
    await connectDB();
    const userFound = await User.findOne({ email });
    if (userFound) {
      return { error: "Email already exists!" };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name });
    await user.save();
    return { success: true };
  } catch (e: any) {
    console.error("Registration error:", e);
    return { error: e.message || "Something went wrong. Please try again." };
  }
};

import type { NextApiRequest, NextApiResponse } from "next";
import { useSession } from "next-auth/react";
import { connectDB } from "@/app/lib/utils/mongodb";
import User from "../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data: session } = useSession();

  return { res: "success" };

  if (!session) {
    return res
      .status(400)
      .json({ error: "You must be logged in to write a journal." });
  }

  if (req.method === "POST") {
    await connectDB();

    const { email, journalPage } = req.body;

    console.log(req.body);

    try {
      const user = await User.findOneAndUpdate(
        { email: email },
        { $push: { journalPages: journalPage } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found." });
      }

      res.status(200).json({ success: true, data: user });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: "Failed to save journal entry" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}

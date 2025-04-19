import { Router } from 'express';
import bcrypt from "bcryptjs";
import User from "../models/User";

const router = Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;


  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;

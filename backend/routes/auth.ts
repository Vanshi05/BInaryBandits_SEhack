import { Router } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

const router = Router();

router.post("/", async (req, res) => {
  const { type, data } = req.body;

  try {
    if (type === "signup") {
      const { name, email, password } = data;

      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(409).json({ message: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();

      return res.status(201).json({ message: "Signup successful" });
    }

    if (type === "login") {
      const { email, password } = data;

      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ message: "Invalid email or password" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

      return res.status(200).json({ message: "Login successful" });
    }

    res.status(400).json({ message: "Invalid type" });
  } catch (error) {
    console.error("Auth error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

import { Router } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { User } from "../models/User.js"

const router = Router()

// POST /auth/register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body
    if (!username || !email || !password) return res.status(400).json({ message: "Missing fields" })
    const exists = await User.findOne({ email })
    if (exists) return res.status(409).json({ message: "Email already registered" })

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({ username, email, passwordHash })
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" })
    res.status(201).json({ token, user: { id: user._id, username: user.username, email: user.email } })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: "Server error" })
  }
})

// POST /auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: "Invalid credentials" })
    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return res.status(401).json({ message: "Invalid credentials" })
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" })
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: "Server error" })
  }
})

export default router

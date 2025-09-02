import { Router } from "express"
import { Song } from "../models/Song.js"

const router = Router()

// GET /songs?query=
router.get("/", async (req, res) => {
  try {
    const { query } = req.query
    const filter = query ? { $or: [{ title: new RegExp(query, "i") }, { artist: new RegExp(query, "i") }] } : {}
    const songs = await Song.find(filter).sort({ createdAt: -1 })
    res.json(songs)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: "Server error" })
  }
})

// GET /songs/:id
router.get("/:id", async (req, res) => {
  try {
    const song = await Song.findById(req.params.id)
    if (!song) return res.status(404).json({ message: "Not found" })
    res.json(song)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: "Server error" })
  }
})

export default router

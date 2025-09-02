import { Router } from "express"
import { requireAuth } from "../middleware/auth.js"
import { Playlist } from "../models/Playlist.js"

const router = Router()

// POST /playlists
router.post("/", requireAuth, async (req, res) => {
  try {
    const { name } = req.body
    if (!name) return res.status(400).json({ message: "Name required" })
    const playlist = await Playlist.create({ name, userId: req.user.id, songs: [] })
    res.status(201).json(playlist)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: "Server error" })
  }
})

// PUT /playlists/:id/addSong
router.put("/:id/addSong", requireAuth, async (req, res) => {
  try {
    const { songId } = req.body
    if (!songId) return res.status(400).json({ message: "songId required" })
    const playlist = await Playlist.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $addToSet: { songs: songId } },
      { new: true },
    ).populate("songs")
    if (!playlist) return res.status(404).json({ message: "Not found" })
    res.json(playlist)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: "Server error" })
  }
})

// DELETE /playlists/:id/removeSong/:songId
router.delete("/:id/removeSong/:songId", requireAuth, async (req, res) => {
  try {
    const { id, songId } = req.params
    const playlist = await Playlist.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { $pull: { songs: songId } },
      { new: true },
    ).populate("songs")
    if (!playlist) return res.status(404).json({ message: "Not found" })
    res.json(playlist)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: "Server error" })
  }
})

export default router

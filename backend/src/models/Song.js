import mongoose from "mongoose"

const songSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    artist: { type: String, required: true, index: true },
    album: { type: String },
    url: { type: String, required: true }, // streaming URL (mp3)
    coverImage: { type: String }, // image URL
  },
  { timestamps: true },
)

export const Song = mongoose.model("Song", songSchema)

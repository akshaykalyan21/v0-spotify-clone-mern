import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }],
    likedSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  },
  { timestamps: true },
)

export const User = mongoose.model("User", userSchema)

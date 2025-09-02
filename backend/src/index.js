import "dotenv/config"
import express from "express"
import cors from "cors"
import morgan from "morgan"
import { connectDB } from "./config/db.js"
import authRoutes from "./routes/auth.routes.js"
import songRoutes from "./routes/songs.routes.js"
import playlistRoutes from "./routes/playlists.routes.js"

const app = express()

app.use(cors({ origin: process.env.CORS_ORIGIN || "*", credentials: true }))
app.use(express.json())
app.use(morgan("dev"))

app.get("/api/health", (_, res) => res.json({ ok: true, service: "spotify-clone-backend" }))

app.use("/api/auth", authRoutes)
app.use("/api/songs", songRoutes)
app.use("/api/playlists", playlistRoutes)

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`[backend] listening on http://localhost:${PORT}`)
  })
})

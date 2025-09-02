import "dotenv/config"
import { connectDB } from "../src/config/db.js"
import { Song } from "../src/models/Song.js"

async function main() {
  await connectDB()
  const demo = [
    {
      title: "Night Drive",
      artist: "Kora Lane",
      album: "Midnight",
      url: "https://cdn.pixabay.com/download/audio/2021/10/26/audio_1.mp3?filename=night-drive.mp3",
      coverImage: "https://picsum.photos/seed/night/400/400",
    },
    {
      title: "Ocean Eyes",
      artist: "Blue Tide",
      album: "Coast",
      url: "https://cdn.pixabay.com/download/audio/2021/11/01/audio_2.mp3?filename=ocean-eyes.mp3",
      coverImage: "https://picsum.photos/seed/ocean/400/400",
    },
  ]
  await Song.deleteMany({})
  await Song.insertMany(demo)
  console.log("[seed] inserted songs:", demo.length)
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

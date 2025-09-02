import mongoose from "mongoose"

export async function connectDB() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error("Missing MONGODB_URI")
    process.exit(1)
  }
  mongoose.set("strictQuery", true)
  await mongoose.connect(uri)
  console.log("[backend] connected to MongoDB")
}

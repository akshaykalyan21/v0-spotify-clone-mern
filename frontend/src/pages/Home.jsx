"use client"

import { useEffect, useState } from "react"
import { api } from "../lib/api.js"
import { usePlayer } from "../context/PlayerContext.jsx"

export default function Home() {
  const [songs, setSongs] = useState([])
  const { play } = usePlayer()

  useEffect(() => {
    api.getSongs().then(setSongs).catch(console.error)
  }, [])

  return (
    <section>
      <h2>Featured</h2>
      <div className="card-grid">
        {songs.map((s) => (
          <div className="card" key={s._id}>
            <img src={s.coverImage || "/placeholder.svg"} alt={`${s.title} cover`} />
            <div style={{ marginTop: 8 }}>
              <div style={{ fontWeight: 600 }}>{s.title}</div>
              <div style={{ opacity: 0.8, fontSize: 12 }}>{s.artist}</div>
            </div>
            <button className="btn" style={{ marginTop: 10 }} onClick={() => play(s, songs)}>
              Play
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

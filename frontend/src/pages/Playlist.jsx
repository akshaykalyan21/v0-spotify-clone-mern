"use client"

// Minimal playlist page example. In a full app you'd fetch playlist details.
// Here we demonstrate adding/removing songs by ID for the current user.
import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { api } from "../lib/api.js"
import { useAuth } from "../context/AuthContext.jsx"
import { usePlayer } from "../context/PlayerContext.jsx"

export default function Playlist() {
  const { id } = useParams()
  const { token } = useAuth()
  const { play } = usePlayer()
  const [songs, setSongs] = useState([])
  const [allSongs, setAllSongs] = useState([])
  const likedMode = id === "liked"

  useEffect(() => {
    api.getSongs().then(setAllSongs).catch(console.error)
  }, [])

  // For demo, keep a local playlist list
  useEffect(() => {
    setSongs(allSongs.slice(0, 5))
  }, [allSongs, id])

  const addSong = async (songId) => {
    if (!token) return alert("Login required")
    if (!likedMode) {
      await api.addSongToPlaylist(id, songId, token)
      alert("Added to playlist (demo)")
    } else {
      alert("Liked (demo)")
    }
  }
  const removeSong = async (songId) => {
    if (!token) return alert("Login required")
    if (!likedMode) {
      await api.removeSongFromPlaylist(id, songId, token)
      alert("Removed from playlist (demo)")
    } else {
      alert("Unliked (demo)")
    }
  }

  const title = useMemo(() => (likedMode ? "Liked Songs" : `Playlist ${id}`), [likedMode, id])

  return (
    <section>
      <h2>{title}</h2>
      <div className="card-grid">
        {songs.map((s) => (
          <div className="card" key={s._id}>
            <img src={s.coverImage || "/placeholder.svg"} alt={`${s.title} cover`} />
            <div style={{ marginTop: 8 }}>
              <div style={{ fontWeight: 600 }}>{s.title}</div>
              <div style={{ opacity: 0.8, fontSize: 12 }}>{s.artist}</div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <button className="btn" onClick={() => play(s, songs)}>
                Play
              </button>
              <button className="btn secondary" onClick={() => addSong(s._id)}>
                Add
              </button>
              <button className="btn secondary" onClick={() => removeSong(s._id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

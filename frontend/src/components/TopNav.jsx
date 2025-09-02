"use client"

import { useState } from "react"
import { api } from "../lib/api.js"
import { usePlayer } from "../context/PlayerContext.jsx"

export default function TopNav() {
  const [q, setQ] = useState("")
  const { play } = usePlayer()

  const doSearch = async (e) => {
    e.preventDefault()
    if (!q.trim()) return
    const res = await api.getSongs(q)
    if (res.length > 0) play(res[0], res)
  }

  return (
    <header className="topnav">
      <form onSubmit={doSearch} style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          className="input"
          placeholder="Search songs or artists"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button className="btn" type="submit">
          Search & Play
        </button>
      </form>
    </header>
  )
}

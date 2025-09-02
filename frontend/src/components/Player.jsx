"use client"
import { usePlayer } from "../context/PlayerContext.jsx"

export default function Player() {
  const { current, isPlaying, progress, toggle, next, prev, seek } = usePlayer()

  return (
    <div className="player">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {current?.coverImage ? (
          <img
            src={current.coverImage || "/placeholder.svg"}
            alt={current?.title || "cover"}
            width="56"
            height="56"
            style={{ borderRadius: 6 }}
          />
        ) : (
          <div style={{ width: 56, height: 56, background: "#222", borderRadius: 6 }} />
        )}
        <div>
          <div style={{ fontWeight: 600 }}>{current?.title || "Nothing playing"}</div>
          <div style={{ opacity: 0.8, fontSize: 12 }}>{current?.artist || "-"}</div>
        </div>
      </div>

      <div>
        <div className="controls">
          <button className="btn secondary" onClick={prev} aria-label="Previous">
            ⏮
          </button>
          <button className="btn" onClick={toggle} aria-label="Play/Pause">
            {isPlaying ? "⏸ Pause" : "▶️ Play"}
          </button>
          <button className="btn secondary" onClick={next} aria-label="Next">
            ⏭
          </button>
        </div>
        <input
          className="range"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={progress || 0}
          onChange={(e) => seek(Number.parseFloat(e.target.value))}
          aria-label="Seek"
        />
      </div>

      <div />
    </div>
  )
}

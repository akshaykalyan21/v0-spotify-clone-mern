"use client"

import { createContext, useContext, useMemo, useRef, useState } from "react"

const PlayerCtx = createContext(null)

export function PlayerProvider({ children }) {
  const audioRef = useRef(null)
  const [current, setCurrent] = useState(null) // { title, artist, url, coverImage }
  const [queue, setQueue] = useState([]) // array of songs
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0) // 0..1

  const play = (song, list = []) => {
    setQueue(list)
    setCurrent(song)
    setIsPlaying(true)
    setProgress(0)
    setTimeout(() => audioRef.current?.play().catch(() => {}), 0)
  }

  const toggle = () => {
    if (!audioRef.current) return
    if (audioRef.current.paused) {
      audioRef.current.play()
      setIsPlaying(true)
    } else {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const next = () => {
    if (!current || queue.length === 0) return
    const idx = queue.findIndex((s) => s._id === current._id)
    const nextIdx = idx >= 0 && idx < queue.length - 1 ? idx + 1 : 0
    const nxt = queue[nextIdx]
    setCurrent(nxt)
    setTimeout(() => audioRef.current?.play().catch(() => {}), 0)
  }

  const prev = () => {
    if (!current || queue.length === 0) return
    const idx = queue.findIndex((s) => s._id === current._id)
    const prevIdx = idx > 0 ? idx - 1 : queue.length - 1
    const prv = queue[prevIdx]
    setCurrent(prv)
    setTimeout(() => audioRef.current?.play().catch(() => {}), 0)
  }

  const seek = (ratio) => {
    if (!audioRef.current) return
    audioRef.current.currentTime = ratio * audioRef.current.duration
  }

  const onTimeUpdate = () => {
    const a = audioRef.current
    if (!a || !a.duration) return
    setProgress(a.currentTime / a.duration)
  }

  const value = useMemo(
    () => ({ current, queue, isPlaying, progress, play, toggle, next, prev, seek, audioRef }),
    [current, queue, isPlaying, progress],
  )

  return (
    <PlayerCtx.Provider value={value}>
      {children}
      <audio ref={audioRef} src={current?.url} onTimeUpdate={onTimeUpdate} onEnded={next} preload="metadata" />
    </PlayerCtx.Provider>
  )
}

export function usePlayer() {
  return useContext(PlayerCtx)
}

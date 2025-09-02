"use client"
import { NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext.jsx"

export default function Sidebar() {
  const { user, logout } = useAuth()
  return (
    <aside className="sidebar">
      <h3 style={{ marginBottom: 12 }}>Spotify Clone</h3>
      <NavLink to="/" className={({ isActive }) => `navlink ${isActive ? "active" : ""}`}>
        Home
      </NavLink>
      <NavLink to="/playlists/liked" className={({ isActive }) => `navlink ${isActive ? "active" : ""}`}>
        Liked Songs
      </NavLink>
      <div style={{ height: 16 }} />
      {user ? (
        <>
          <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 8 }}>Logged in as</div>
          <div style={{ marginBottom: 12 }}>{user.username}</div>
          <button className="btn secondary" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink to="/login" className="btn" style={{ display: "inline-block" }}>
            Login
          </NavLink>
        </>
      )}
    </aside>
  )
}

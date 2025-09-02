"use client"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import Sidebar from "./components/Sidebar.jsx"
import TopNav from "./components/TopNav.jsx"
import Player from "./components/Player.jsx"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Playlist from "./pages/Playlist.jsx"
import { AuthProvider, useAuth } from "./context/AuthContext.jsx"
import { PlayerProvider } from "./context/PlayerContext.jsx"

function ProtectedRoute({ children }) {
  const { token } = useAuth()
  const loc = useLocation()
  if (!token) return <Navigate to="/login" replace state={{ from: loc }} />
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <PlayerProvider>
        <div className="app">
          <Sidebar />
          <main className="content">
            <TopNav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/playlists/:id"
                element={
                  <ProtectedRoute>
                    <Playlist />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
          <Player />
        </div>
      </PlayerProvider>
    </AuthProvider>
  )
}

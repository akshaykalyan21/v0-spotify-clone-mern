"use client"

import { useState } from "react"
import { api } from "../lib/api.js"
import { useAuth } from "../context/AuthContext.jsx"
import { Link, useNavigate } from "react-router-dom"

export default function Register() {
  const nav = useNavigate()
  const { login } = useAuth()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const data = await api.register({ username, email, password })
      login(data)
      nav("/", { replace: true })
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="form" onSubmit={submit}>
      <h2>Create Account</h2>
      <input
        className="input"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        className="input"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="input"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <div style={{ color: "#ff6b6b" }}>{error}</div>}
      <button className="btn" disabled={loading}>
        {loading ? "..." : "Register"}
      </button>
      <div style={{ fontSize: 12, opacity: 0.8 }}>
        Have an account? <Link to="/login">Login</Link>
      </div>
    </form>
  )
}

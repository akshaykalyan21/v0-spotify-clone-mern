"use client"

import { useState } from "react"
import { api } from "../lib/api.js"
import { useAuth } from "../context/AuthContext.jsx"
import { Link, useLocation, useNavigate } from "react-router-dom"

export default function Login() {
  const nav = useNavigate()
  const loc = useLocation()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const data = await api.login({ email, password })
      login(data)
      nav(loc.state?.from?.pathname || "/", { replace: true })
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="form" onSubmit={submit}>
      <h2>Login</h2>
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
        {loading ? "..." : "Login"}
      </button>
      <div style={{ fontSize: 12, opacity: 0.8 }}>
        No account? <Link to="/register">Register</Link>
      </div>
    </form>
  )
}

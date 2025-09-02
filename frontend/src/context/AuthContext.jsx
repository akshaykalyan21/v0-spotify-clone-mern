"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

const AuthCtx = createContext(null)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const t = localStorage.getItem("token")
    const u = localStorage.getItem("user")
    if (t) setToken(t)
    if (u) setUser(JSON.parse(u))
  }, [])

  const login = ({ token, user }) => {
    setToken(token)
    setUser(user)
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }

  const value = useMemo(() => ({ user, token, login, logout }), [user, token])
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}
export function useAuth() {
  return useContext(AuthCtx)
}

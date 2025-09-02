const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

async function request(path, { method = "GET", body, token } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || "Request failed")
  }
  return res.json()
}

export const api = {
  // Auth
  register: (data) => request("/auth/register", { method: "POST", body: data }),
  login: (data) => request("/auth/login", { method: "POST", body: data }),
  // Songs
  getSongs: (query) => request(`/songs${query ? `?query=${encodeURIComponent(query)}` : ""}`),
  getSong: (id) => request(`/songs/${id}`),
  // Playlists
  createPlaylist: (name, token) => request("/playlists", { method: "POST", body: { name }, token }),
  addSongToPlaylist: (id, songId, token) =>
    request(`/playlists/${id}/addSong`, { method: "PUT", body: { songId }, token }),
  removeSongFromPlaylist: (id, songId, token) =>
    request(`/playlists/${id}/removeSong/${songId}`, { method: "DELETE", token }),
}

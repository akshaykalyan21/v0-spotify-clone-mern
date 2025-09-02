"use client"

export default function Page() {
  return (
    <main
      className="min-h-screen p-6"
      style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" }}
    >
      <h1 className="text-balance" style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
        Spotify Clone (MERN)
      </h1>
      <p style={{ opacity: 0.8, marginBottom: 16 }}>
        This is a monorepo with a Node/Express backend and a Vite/React frontend. Use the root scripts to run both.
      </p>

      <section style={{ marginTop: 16, marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Quick Start</h2>
        <ol style={{ lineHeight: 1.6, paddingLeft: 18 }}>
          <li>
            Copy environment files:
            <pre style={{ background: "#111", color: "#fff", padding: 12, borderRadius: 8, overflow: "auto" }}>
              {`backend/.env.example -> backend/.env
frontend/.env.example -> frontend/.env`}
            </pre>
          </li>
          <li>
            Install dependencies:
            <pre style={{ background: "#111", color: "#fff", padding: 12, borderRadius: 8, overflow: "auto" }}>
              {`npm install`}
            </pre>
          </li>
          <li>
            (Optional) Seed demo songs:
            <pre style={{ background: "#111", color: "#fff", padding: 12, borderRadius: 8, overflow: "auto" }}>
              {`npm --prefix backend run seed`}
            </pre>
          </li>
          <li>
            Run both servers:
            <pre style={{ background: "#111", color: "#fff", padding: 12, borderRadius: 8, overflow: "auto" }}>
              {`npm run dev

Backend:  http://localhost:5000
Frontend: http://localhost:5173`}
            </pre>
          </li>
        </ol>
      </section>

      <section style={{ marginTop: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>API Endpoints</h2>
        <ul style={{ lineHeight: 1.6, paddingLeft: 18 }}>
          <li>POST /api/auth/register</li>
          <li>POST /api/auth/login</li>
          <li>GET /api/songs</li>
          <li>GET /api/songs/:id</li>
          <li>POST /api/playlists</li>
          <li>PUT /api/playlists/:id/addSong</li>
          <li>DELETE /api/playlists/:id/removeSong/:songId</li>
        </ul>
      </section>
    </main>
  )
}

# Spotify Clone (MERN)

Tech:
- Frontend: React (Vite), simple CSS
- Backend: Node.js, Express.js
- DB: MongoDB (Atlas)
- Auth: JWT + bcrypt

Quick Start:
1) Copy env files
- backend/.env.example -> backend/.env
- frontend/.env.example -> frontend/.env
2) Install deps: npm install
3) Seed sample songs (optional): npm --prefix backend run seed
4) Run both: npm run dev
- Backend: http://localhost:5000
- Frontend: http://localhost:5173

Deploy
- Frontend: Vercel (build: npm run build in frontend)
- Backend: Render/Railway/Heroku
- DB: MongoDB Atlas

Folder Structure
- backend/: Express app (routes, models, middleware, config)
- frontend/: Vite React app (pages, components, context)

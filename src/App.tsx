import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom"
import Cookies from "js-cookie"

// PAGES
import { Home, Leads, Login, Profile, Registration } from "./pages"

//  Rota protegida
function ProtectedRoute() {
  const isAuthenticated = !!Cookies.get("Authorization")

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

//  Rota pública (login e cadastro)
function PublicRoute() {
  const isAuthenticated = !!Cookies.get("Authorization")

  if (isAuthenticated) {
    return <Navigate to="/home" replace />
  }

  return <Outlet />
}

function App() {
  return (
    <Router>
      <Routes>

        {/* Redireciona raiz para login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Rotas públicas */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Registration />} />
        </Route>

        {/* Rotas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/perfil" element={<Profile />} />
        </Route>

        {/* Rota fallback (caso digite algo errado na URL) */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </Router>
  )
}

export default App
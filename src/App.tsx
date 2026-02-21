import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom"
import Cookies from "js-cookie"
import { Home, Leads, Login, Profile, Registration } from "./pages"

function ProtectedRoute() {
  const isAuthenticated = !!Cookies.get("Authorization")

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

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

        {/* Redireciona "/" para "/login" */}
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

      </Routes>
    </Router>
  )
}

export default App
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom"
import Cookies from "js-cookie"
import { Home, Leads, Login, Profile, Registration } from "./pages"

function ProtectedRoute() {
  const checkAuthCookie = Cookies.get('Authorization')

  if (!checkAuthCookie) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

function App() {
  return (
    <Router>
      <Routes>

        {/*  Redireciona "/" para "/login" */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Registration />} />

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
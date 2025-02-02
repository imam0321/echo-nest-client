import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import SignUp from "./pages/SignUp/SignUp"
import Profile from "./pages/Profile/Profile"
import NotFound from "./pages/Share/NotFound"
import PrivateRouter from "./routers/PrivateRouter"

function App() {

  return (
    <Routes>
      <Route element={<Login />} path="/login" />
      <Route element={<SignUp />} path="/signUp" />

      <Route element={<PrivateRouter />}>
        <Route element={<Home />} path="/" exact />
        <Route element={<Profile />} path="/me" />

      </Route>
      
      <Route element={<NotFound />} path="*" />
    </Routes>
  )
}

export default App

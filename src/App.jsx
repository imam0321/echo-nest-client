import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import SignUp from "./pages/SignUp/SignUp"
import Profile from "./pages/Profile/Profile"
import NotFound from "./pages/Share/NotFound"

function App() {

  return (
    <Routes>
      <Route element={<Home/>} path="/" exact />
      <Route element={<Login/>} path="/login" />
      <Route element={<SignUp/>} path="/signUp" />
      <Route element={<Profile/>} path="/me" />


      <Route element={<NotFound/>} path="*" />
    </Routes>
  )
}

export default App

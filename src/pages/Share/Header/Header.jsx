import HomeIcon from "../../../assets/icons/home.svg"
import Notification from "../../../assets/icons/notification.svg"
import Avatar from "../../../assets/images/avatars/avatar_1.png"
import LogOutIcon from "../../../assets/icons/logout.svg"
import { Link, useNavigate } from 'react-router-dom'
import useAuth from "../../../hooks/useAuth"
import useProfile from "../../../hooks/useProfile"

export default function Header() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const { state } = useProfile();

  const user = state?.user ?? auth?.user;

  const handleLogout = () => {
    setAuth({});
    navigate("/login")
  }
  return (
    <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
      <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
        <Link to="/" className="text-2xl ms-12">
          Echo Nest
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/" className="btn-primary">
            <img src={HomeIcon} alt="Home" />
            Home
          </Link>
          <button className="icon-btn">
            <img src={Notification} alt="Notification" />
          </button>
          <button className="icon-btn" onClick={handleLogout}>
            <img src={LogOutIcon} alt="Logout" />
          </button>

          <Link to="/me" className="flex-center !ml-8 gap-3">
            <span className="text-lg font-medium lg:text-xl">{user?.firstName}{" "}{user?.lastName}</span>
            <img className="max-h-[32px] max-w-[32px] lg:max-h-[44px] lg:max-w-[44px]"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`} alt="" />
          </Link>
        </div>
      </div>
    </nav>
  )
}

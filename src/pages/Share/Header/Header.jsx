import HomeIcon from "../../../assets/icons/3dots.svg"
import Notification from "../../../assets/icons/notification.svg"
import Avatar from "../../../assets/images/avatars/avatar_1.png"
import LogOutIcon from "../../../assets/icons/logout.svg"
import { Link, useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login")
  }
  return (
    <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
      <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
        <Link to="/" className="text-2xl ms-8">
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

          <button className="flex-center !ml-8 gap-3">
            <span className="text-lg font-medium lg:text-xl">Imam</span>
            <img className="max-h-[32px] max-w-[32px] lg:max-h-[44px] lg:max-w-[44px]"
              src={Avatar} alt="" />
          </button>
        </div>
      </div>
    </nav>
  )
}

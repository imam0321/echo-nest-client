import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


export default function Home() {
  const {auth} = useAuth()
  return (
    <div>
      <Link to="/me">Go to Profile page</Link>
    </div>
  )
}

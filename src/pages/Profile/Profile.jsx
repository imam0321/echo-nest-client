import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth"
import useAxios from "../../hooks/useAxios"

export default function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {api} = useAxios()
  const {auth} = useAuth();

  useEffect(()=> {
    setLoading(true);
    const fetchProfile = async () => {
      try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`)
        
        
        setUser(response?.data?.user)
        setPosts(response?.data?.posts)
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    }

    fetchProfile();
  }, [])

  if (loading) {
    return <div>Fetch profile data....</div>
  }

  console.log(user);
  console.log(posts);

  return (
    <div>{user?.firstName}{" "}{user?.lastName}</div>
  )
}

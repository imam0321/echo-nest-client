import LikeIcon from "../../assets/icons/like.svg"
import CommentIcon from "../../assets/icons/comment.svg"
import ShareIcon from "../../assets/icons/share.svg"
import Liked from "../../assets/icons/like-filled.svg"
import { useState } from "react"
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth"

export default function PostAction({ post, commentCount }) {
  const { auth } = useAuth();
  const [liked, setLiked] = useState(post?.likes?.includes(auth?.user?.id));
  const { api } = useAxios();

  const handleLiked = async () => {
    try {
      const response = await api.patch(`${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post?.id}/like`)
      if (response.status === 200) {
        setLiked(true)
      }
    } catch (error) {
      console.log(error);
      setLiked(false)
    }
  }

  return (
    <div className="flex items-center justify-between py-6 lg:px-10 lg:py-8">
      <button
        onClick={handleLiked}
        className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm"
      >
        <img className="w-6" src={liked ? Liked : LikeIcon} alt="Like" />
        {!liked && <span>Like</span>}
      </button>

      <button
        className="icon-btn space-x-2 px-6 py-3 text-xs lg:px-12 lg:text-sm"
      >
        <img src={CommentIcon} alt="Comment" />
        <span>Comment({commentCount ?? 0})</span>
      </button>
      <button
        className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm"
      >
        <img src={ShareIcon} alt="Share" />
        <span>Share</span>
      </button>
    </div>
  )
}

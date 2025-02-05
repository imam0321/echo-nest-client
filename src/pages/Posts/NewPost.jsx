import { useState } from "react"
import PostEntry from "./PostEntry"
import useAuth from "../../hooks/useAuth";
import BlankProfile from "../../assets/images/blankProfile.jpeg"

export default function NewPost() {
  const [showPostEntry, setShowPostEntry] = useState(false);
  const { auth } = useAuth();

  return (
    <>
      {
        showPostEntry ? <PostEntry onCreated={()=> setShowPostEntry(false)}/> : (
          <div className="card">
            <div className="flex-center mb-3 gap-2 lg:gap-4">
              <img className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
                src={auth?.user?.avatar
                  ? `${import.meta.env.VITE_SERVER_BASE_URL}/${auth?.user?.avatar}`
                  : BlankProfile} alt="avatar" />

              <div className="flex-1">
                <textarea onClick={() => setShowPostEntry(!showPostEntry)} className="h-16 w-full rounded-md bg-[#27292F] p-3 focus:outline-none sm:h-20 sm:p-6" name="post"
                  id="post" placeholder="What's on your mind?"></textarea>
              </div>
            </div>
          </div>
        )
      }

    </>
  )
}

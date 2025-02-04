import React, { useState } from 'react'
import useAvatar from '../../hooks/useAvatar';

export default function PostComments({ post }) {
  const [showAction, setShowAction] = useState(false);
  const { avatarURL } = useAvatar(post);
  const comments = post?.comments;

  return (
    <div>
      <div className="flex-center mb-3 gap-2 lg:gap-4">
        <img
          className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
          src={avatarURL}
          alt="avatar"
        />

        <div className="flex-1">
          <input
            type="text"
            className="h-8 w-full rounded-full bg-[#27292F] px-4 text-xs focus:outline-none sm:h-[38px]"
            name="post"
            id="post"
            placeholder="What's on your mind?"
          />
        </div>
      </div>
      <div className="mt-4">
        <button onClick={() => setShowAction(!showAction)} className="text-gray-300 max-md:text-sm">
          All Comment ▾
        </button>
      </div>
      {
        showAction && <div className="space-y-4 divide-y divide-[#27292F] pl-2 lg:pl-3">
          {
            comments.map(comment => <div key={comment?.id} className="flex items-center gap-3 pt-4">
              <img
                className="max-w-6 max-h-6 rounded-full"
                src={`${import.meta.env.VITE_SERVER_BASE_URL}/${comment?.author?.avatar}`}
                alt="avatar"
              />
              <div>
                <div className="flex gap-1 text-xs lg:text-sm">
                  <span>{comment?.author?.name}: </span>
                  <span>{comment?.comment}</span>
                </div>
              </div>
            </div>)
          }
        </div>
      }
    </div>
  )
}

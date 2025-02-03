import EditIcon from "../../assets/icons/edit.svg"
import CheckIcon from "../../assets/icons/check.svg"
import useProfile from "../../hooks/useProfile";
import { useRef, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { actions } from "../../actions";

export default function ProfileInfo() {
  const { state, dispatch } = useProfile();
  const { api } = useAxios();
  const fileUploadRef = useRef();

  const [bio, setBio] = useState(state?.user?.bio);
  const [editMode, setEditMode] = useState(false);

  // handle file upload input filed and upload file
  const handleFileUpload = (e) => {
    e.preventDefault()
    fileUploadRef.current.addEventListener("change", uploadImageDisplay)
    fileUploadRef.current.click();
  }
  
  // upload avatar by upload function
  const uploadImageDisplay = async () => {
    const formData = new FormData();

    for (const file of fileUploadRef.current.files) {
      formData.append("avatar", file)
    }

    dispatch({ type: actions.profile.DATA_FETCHING })
    try {
      const response = await api.post(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state?.user?.id}/avatar`, formData)

      if (response.status === 200) {
        dispatch({ type: actions.profile.IMAGE_UPDATED, data: response.data })
      }

    } catch (error) {
      dispatch({ type: actions.profile.DATA_FETCHING_ERROR, error: error.message })
    }
  }

  // Bio edit handler 
  const handleBioEdit = async () => {
    dispatch({ type: actions.profile.DATA_FETCHING })
    try {
      const response = await api.patch(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state?.user?.id}`, { bio });

      if (response.status === 200) {
        dispatch({ type: actions.profile.USER_DATA_EDITED, data: response.data })
      }
      setEditMode(false)

    } catch (error) {
      dispatch({ type: actions.profile.DATA_FETCHING_ERROR, error: error.message })
    }

  }


  return (
    <div className="flex flex-col items-center py-8 text-center">

      {/* profile picture section  */}
      <div
        className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]"
      >
        <img
          className="max-w-full rounded-full"
          src={`${import.meta.env.VITE_SERVER_BASE_URL}/${state?.user?.avatar}`}
          alt={state?.user?.firstName}
        />

        <form>
          <button
            type="submit"
            onClick={handleFileUpload}
            className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
          >
            <img src={EditIcon} alt="Edit" />
          </button>
          <input id="file" type="file" ref={fileUploadRef} hidden />
        </form>

      </div>
      <div>
        <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
          {state?.user?.firstName}{" "}{state?.user?.lastName}
        </h3>
        <p className="leading-[231%] lg:text-lg">{state?.user?.email}</p>
      </div>

      {/* Bio section  */}
      <div className="mt-4 flex items-start gap-2 lg:mt-6">
        <div className="flex-1">
          {!editMode ? (
            <p className="leading-[188%] text-gray-400 lg:text-lg">
              {state?.user?.bio}
            </p>
          ) : (
            <textarea
              value={bio}
              rows={3}
              cols={60}
              onChange={(e) => setBio(e.target.value)}
            />
          )}
        </div>
        {!editMode ? (
          <button onClick={() => setEditMode(true)} className="flex-center h-7 w-7 rounded-full">
            <img src={EditIcon} alt="Edit" />
          </button>
        ) : (
          <button onClick={handleBioEdit} className="flex-center h-7 w-7 rounded-full">
            <img src={CheckIcon} alt="Check" />
          </button>
        )}
      </div>

      <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
    </div>
  )
}

import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth"
import useAxios from "../../hooks/useAxios"
import useProfile from "../../hooks/useProfile";
import { actions } from "../../actions";
import ProfileInfo from "./ProfileInfo";
import MyPosts from "./MyPosts";


export default function Profile() {
  const { state, dispatch } = useProfile();
  const { api } = useAxios()
  const { auth } = useAuth();

  useEffect(() => {
    dispatch({ type: actions.profile.DATA_FETCHING })
    const fetchProfile = async () => {
      try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`)

        if (response.status === 200) {
          dispatch({ type: actions.profile.DATA_FETCHED, data: response.data })
        }

      } catch (error) {
        console.log(error);
        dispatch({ type: actions.profile.DATA_FETCHING_ERROR, error: error.message })
      }
    }

    fetchProfile();
  }, [])

  if (state?.loading) {
    return <div>Fetch profile data....</div>
  }

  return (
    <>
      <ProfileInfo />
      {/* <MyPosts /> */}
    </>
  )
}

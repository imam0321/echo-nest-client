import { useEffect } from "react";
import PostList from "../Posts/PostList";
import useAxios from "../../hooks/useAxios";
import { actions } from "../../actions";
import usePost from "../../hooks/usePost";


export default function Home() {
  const { state, dispatch } = usePost();
  const { api } = useAxios();

  useEffect(() => {
    dispatch({ type: actions.post.DATA_FETCHING })
    const fetchPosts = async () => {
      try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/posts`)

        if (response.status === 200) {
          dispatch({ type: actions.post.DATA_FETCHED, data: response?.data })
        }

      } catch (error) {
        dispatch({ type: actions.post.DATA_FETCHING_ERROR, error: error.message })
      }
    }
    fetchPosts()
  }, [])

  if (state.loading) {
    return <div>Posts is Loading</div>
  }

  if (state.error) {
    return <div>Error in posts fetching</div>
  }

  return (
    <div>
      <PostList posts={state?.posts} />
    </div>
  )
}

import useProfile from "../../hooks/useProfile"
import PostList from "../Posts/PostList"


export default function MyPosts() {
  const { state } = useProfile();
  const posts = state?.posts;
  
  // posts sort by Created time 
  const sortedPosts = posts?.slice().sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
  
  return (
    <>
      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Posts</h4>
      <PostList posts={sortedPosts}/>  
    </>
  )
}

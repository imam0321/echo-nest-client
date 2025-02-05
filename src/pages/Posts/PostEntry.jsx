import { useForm } from "react-hook-form";
import AddPhoto from "../../assets/icons/addPhoto.svg"
import BlankProfile from "../../assets/images/blankProfile.jpeg"
import useAuth from "../../hooks/useAuth"
import Field from "../Share/Fields/Field";
import useAxios from "../../hooks/useAxios";
import usePost from "../../hooks/usePost";
import useProfile from "../../hooks/useProfile";
import { actions } from "../../actions";

export default function PostEntry({onCreated}) {
  const { auth } = useAuth();
  const { api } = useAxios();
  const { dispatch } = usePost();
  const { state: profile } = useProfile();

  const user = profile?.user || auth?.user;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm();

  const handlePostSubmit = async (formData) => {
    dispatch({ type: actions.post.DATA_FETCHING })
    try {
      const response = await api.post(`${import.meta.env.VITE_SERVER_BASE_URL}/posts`, { formData });

      if (response.status === 200) {
        dispatch({ type: actions.post.DATA_CREATED, data: response.data })
        onCreated()
      }
      

    } catch (error) {
      console.log(error);
      dispatch({ type: actions.post.DATA_FETCHING_ERROR, error: error.message })
    }
  }


  return (
    <div className="container">
      <div className="card relative">
        <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
          Create Post
        </h6>

        <form onSubmit={handleSubmit(handlePostSubmit)}>
          <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
            <div className="flex items-center gap-3">
              <img className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
                src={auth?.user?.avatar
                  ? `${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`
                  : BlankProfile} alt="avatar" />
              <div>
                <h6 className="text-lg lg:text-xl">{user?.firstName}{" "}{user?.lastName}</h6>

                <span className="text-sm text-gray-400 lg:text-base">Public</span>
              </div>
            </div>

            <label className="btn-primary cursor-pointer !text-gray-100" htmlFor="photo">
              <img src={AddPhoto} alt="Add Photo" />

              Add Photo
            </label>
            <input type="file" name="photo" id="photo" className="hidden" />
          </div>

          <Field label="" error={errors.content}>
            <textarea
              {...register("content", { required: "adding some text.." })}
              name="content"
              id="content"
              placeholder="Share your thoughts..."
              className="h-[120px] w-full bg-transparent focus:outline-none lg:h-[160px]"></textarea>
          </Field>
          <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
            <button className="auth-input bg-[#00D991] font-bold text-[#17181C] transition-all hover:opacity-90"
              type="submit">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

import React from 'react'
import { useForm } from 'react-hook-form'
import Field from '../Share/Fields/Field';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';


export default function LoginForm() {
  const navigate = useNavigate();
  const { setAuth } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm();

  const submitForm = async (formData) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`, formData)

      if (response.status === 200) {
        const { user, token } = response.data;
        if (token) {
          const authToken = token.token;
          const refreshToken = token.refreshToken;

          // console.log(`Login time token: ${authToken}`);
          const authData = { user, authToken, refreshToken };
          localStorage.setItem("auth", JSON.stringify(authToken));

          setAuth(authData);
          navigate("/")
        }
      }

    } catch (error) {
      setError("root.random", {
        type: "random",
        message: `User with email ${formData.email} is not found`
      })
    }

  }

  return (
    <form
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[30px]"
      onSubmit={handleSubmit((submitForm))}
    >

      <Field label="Email" error={errors.email}>
        <input
          {...register("email", { required: "Email is Required" })}
          type="email"
          name="email"
          id="email"
          className={`w-full rounded-md border p-1.5 focus:outline-none lg:p-3 ${errors.email ? "border-red-500" : "border-[#CCCCCC]/[14%]"}`}
        />
      </Field>
      <Field label="Password" error={errors.password}>
        <input
          {...register("password", { required: "Password id Required", minLength: { value: 8, message: "Your password must be at lest 8 character" } })}
          type="password"
          name='password'
          className={`w-full rounded-md border p-1.5 focus:outline-none lg:p-3 ${errors.password ? "border-red-500" : "border-[#CCCCCC]/[14%]"}`} />
      </Field>
      <p className='text-red-500 my-2'>{errors?.root?.random?.message}</p>
      <Field>
        <button
          className="auth-input bg-[#00D991] font-bold text-[#17181C] transition-all hover:opacity-90"
          type="submit"
        >
          Login
        </button>
      </Field>
    </form>
  )
}

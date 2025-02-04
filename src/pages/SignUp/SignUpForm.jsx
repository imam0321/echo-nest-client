import React from 'react'
import { useForm } from 'react-hook-form';
import Field from '../Share/Fields/Field';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUpForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm();

  const submitForm = async (formData) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`, formData)

      if (response.status === 201) {
        navigate("/login")
      }
    } catch (error) {
      setError("root.random", {
        type: "random",
        message: `Something went ${formData.email}`
      })
    }
  }

  return (
    <form
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[30px]"
      onSubmit={handleSubmit((submitForm))}
    >
      <div className="flex justify-between items-center gap-x-2">

        <Field label="First Name" error={errors.firstName}>
          <input
            {...register("firstName", { required: "First Name is Required" })}
            type="text"
            name="firstName"
            id="firstName"
            className={`w-full rounded-md border p-1.5 focus:outline-none lg:p-3 ${errors.firstName ? "border-red-500" : "border-[#CCCCCC]/[14%]"}`}
          />
        </Field>
        <Field label="Last Name" error={errors.lastName}>
          <input
            {...register("lastName", { required: "Last Name is Required" })}
            type="text"
            name="lastName"
            id="lastName"
            className={`w-full rounded-md border p-1.5 focus:outline-none lg:p-3 ${errors.lastName ? "border-red-500" : "border-[#CCCCCC]/[14%]"}`}
          />
        </Field>
      </div>
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
          Register
        </button>
      </Field>
    </form>
  )
}

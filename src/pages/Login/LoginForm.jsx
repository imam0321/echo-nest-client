import React from 'react'
import { useForm } from 'react-hook-form'
import Field from '../Share/Fields/Field';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';


export default function LoginForm() {
  const navigate = useNavigate();
  const { setAuth } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = (formData) => {
    console.log(formData);
    const user = {...formData}
    setAuth({user})
    navigate("/")
  }

  return (
    <form
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
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

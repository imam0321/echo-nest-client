import React from 'react'
import useAuth from '../hooks/useAuth'
import Header from "../pages/Share/Header/Header"
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRouter() {
  const { auth } = useAuth();

  return (
    <>
      {
        auth?.user ? (
          <>
            <Header />
            <div className='mx-auto max-w-[1020px] py-8'>
              <div className="container">
                <Outlet />
              </div>
            </div>
          </>
        ) : (
          <Navigate to="/login" />
        )
      }


    </>
  )
}

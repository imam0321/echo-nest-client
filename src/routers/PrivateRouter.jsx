import React from 'react'
import useAuth from '../hooks/useAuth'
import Header from "../pages/Share/Header/Header"
import { Navigate, Outlet } from 'react-router-dom';
import ProfileProvider from '../providers/ProfileProvider';
import PostProvider from '../providers/PostProvider';

export default function PrivateRouter() {
  const { auth } = useAuth();

  return (
    <>
      {
        auth?.authToken ? (
          <>
            <PostProvider>
              <ProfileProvider>
                <Header />
                <div className='mx-auto max-w-[1020px] py-8'>
                  <div className="container">
                    <Outlet />
                  </div>
                </div>
              </ProfileProvider>
            </PostProvider>
          </>
        ) : (
          <Navigate to="/login" />
        )
      }


    </>
  )
}

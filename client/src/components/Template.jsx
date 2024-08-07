import React, { useState } from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

const Template = () => {
    const [isLogin, setIsLogin] = useState(true);
  return (
    <>
        <div className='mt-60 absolute bg-gray-300 w-[400px] mx-auto flex flex-col items-center justify-center rounded-md text-black'>
            <h1 className='text-black opacity-100 font-semibold text-xl mt-7'>{isLogin?("Sign In"):("Sign Up")}</h1>
            {
                isLogin ? (
                    <LoginForm setIsLogin={setIsLogin}/>
                ):(
                    <SignupForm setIsLogin={setIsLogin}/>
                )
            }
            
        </div>
    </>
  )
}

export default Template
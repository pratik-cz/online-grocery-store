'use client'
// import LoginButton from '@/app/_components/_custom_buttons/LoginButton'
import { UpdateCartContext } from '@/app/_context/UpdateCartContext'
import GlobalApi from '@/app/_utils/GlobalApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoaderCircle, LoaderIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from "sonner"
import dynamic from 'next/dynamic'
 
const LoginButton = dynamic(() => import('@/app/_components/_custom_buttons/LoginButton'), {
  ssr: false,
})
const SignIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();
  const [loader, setLoader] = useState();
  const { updateCart, setUpdateCart, isLoggedIn, setIsLoggedIn } = useContext(UpdateCartContext)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // const jwt = sessionStorage.getItem('jwt');
      // if (jwt) {
      //   router.push('/');
      // }
    }

  }, [])

  return (
    <div className='flex items-baseline justify-center my-8'>
      <div className='flex flex-col items-center p-10 bg-slate-100 border border-gray-200'>
        <Image src={'/logo.png'} width={200} height={200} />
        <h2 className='font-bold text-3xl'>Sign In</h2>
        <h2 className='text-gray-500'>Enter Email & Password to Sign in to your account.</h2>
        <div className='w-full flex flex-col gap-5 mt-7'>
          <Input placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
          <Input type='password' placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <LoginButton email={email} password={password} loader={loader} setLoader={setLoader} setUpdateCart={setUpdateCart}
          
          updateCart={updateCart}  isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
          />
          <p>
            <span className='mr-1'>Don't have an account </span>
            <Link href={'/create-account'} className="text-blue-500">Click here to Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
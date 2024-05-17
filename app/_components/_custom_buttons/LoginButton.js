'use client'
import GlobalApi from '@/app/_utils/GlobalApi'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

const LoginButton = ({email,password,loader,setLoader,setUpdateCart,updateCart,isLoggedIn,setIsLoggedIn}) => {
    const router = useRouter();
    const onSignIn = () => {
        setLoader(true);
        GlobalApi.signinUser(email, password).then(resp => {
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('user', JSON.stringify(resp.data.user));
            sessionStorage.setItem('jwt', resp.data.jwt)
          }
    
          toast("Sign In successfully")
          setLoader(false);
          setUpdateCart(!updateCart)
          setIsLoggedIn(true)
          router.push('/');
        }, (e) => {
          console.log(e)
          setLoader(false)
          toast(e?.response?.data?.error?.message);
        })
      }
    return (
        <Button onClick={() => onSignIn()}
            disabled={!(email && password)}
        >
            {
                loader ? <LoaderCircle className='animate-spin' /> : 'Sign In'
            }

        </Button>
    )
}

export default LoginButton
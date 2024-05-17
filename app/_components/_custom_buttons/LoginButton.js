import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import React from 'react'

const LoginButton = ({email,password,loader,onSignIn}) => {
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
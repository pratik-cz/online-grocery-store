'use client'
import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const CartItemList = ({cartItemList,onDeleteItem}) => {
  const jwt = sessionStorage.getItem('jwt');
  return (
    <div>
        <div className='flex flex-col gap-1 h-[500px] overflow-auto px-4'>
            {
                cartItemList && cartItemList.map((cart,index)=>(
                    <div  className='flex justify-between  items-center'>
                       <div className='flex gap-4 items-center'>
                       <Image 
                         src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                            cart.image}
                             width={70} height={70} alt=''
                             className='border p-2'
                        />
                        <div>
                            <h2 className='font-bold'>{cart.name}</h2>
                            <h2>Quantity : {cart.quantity}</h2>
                            <h2 className='font-bold text-lg'>₹ {cart.amount}</h2>
                        </div>
                       </div>
                       <TrashIcon className='cursor-pointer' onClick={()=>{onDeleteItem(cart.id,jwt)}} />
                    </div>
                ))
            }
        </div>
        
    </div>
  )
}

export default CartItemList
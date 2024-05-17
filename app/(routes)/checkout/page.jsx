'use client'
import GlobalApi from '@/app/_utils/GlobalApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { ArrowBigRight, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Checkout = () => {
  if (typeof window !== 'undefined') {
    const jwt = sessionStorage.getItem('jwt');
    const user = JSON.parse(sessionStorage.getItem('user'))
  }

  const [totalcartItem, setTotalCartItem] = useState(0)
  const [cartItemList, setCartItemList] = useState([])
  const [subtotal, setSubTotal] = useState(0);
  const router = useRouter()

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [zip, setZip] = useState();
  const [address, setAddress] = useState();
  const [totalAmount, setTotalAmount] = useState(0);
  const getCartItems = async () => {
    if (user) {
      const cartItemList_ = await GlobalApi.getCartItems(user?.id, jwt);
      console.log(cartItemList_);
      setTotalCartItem(cartItemList_?.length);
      setCartItemList(cartItemList_)
    }
  }
  useEffect(() => {
    if (!jwt) {
      router.push('/sign-in')
    }
  }, [])
  useEffect(() => {
    getCartItems()

  }, [])
  useEffect(() => {
    let total = 0;
    cartItemList.forEach(element => {
      total = total + element.amount;
    })
    setTotalAmount((total + (total * 9 / 100) + 15))
    setSubTotal(total)
  }, [cartItemList])
  const calculateTotalAmount = () => {
    const totAmount = subtotal + (subtotal * 9 / 100) + 15

    return totAmount;
  }
  return (
    <div>
      <h2 className='p-3 bg-primary text-xl font-bold text-center text-white'>Checkout</h2>
      <div className='md:p-5 md:px-5 md:px-10 md:grid  md:grid-cols-3 md:py-8'>
        <div className='col-span-2 mx-10 md:mx-20'>
          <h2 className='font-bold text-3xl'>Billing Details</h2>
          <div className='grid grid-cols-2 gap-10 mt-3'>
            <Input placeholder="Name" onChange={(e) => setUsername(e.target.value)} />
            <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='grid grid-cols-2 gap-10 mt-3'>
            <Input placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
            <Input placeholder="Zip" onChange={(e) => setZip(e.target.value)} />
          </div>
          <div className='mt-3'>
            <Input placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
          </div>
        </div>
        <div className='mx-10 border mt-10 md:mt-0'>
          <h2 className='p-3 bg-gray-200 font-bold text-center '>Total Cart({totalcartItem})</h2>
          <div className='p-4 flex flex-col gap-4 ' >
            <h2 className='font-bold flex justify-between'>Subtotal :<span>₹ {subtotal}</span></h2>
            <hr></hr>
            <h2 className='flex justify-between'>Delivery :<span>₹ 15:00</span> </h2>
            <h2 className='flex justify-between'>Tax (9%) :<span>₹ {subtotal * 9 / 100}</span> </h2>
            <hr></hr>
            <h2 className=' font-bold flex justify-between'>Total :<span>₹ {calculateTotalAmount()} </span> </h2>
            {/* <Button>Payment <ArrowBigRight /> </Button> */}
            {subtotal > 0 ? <PayPalButtons
              style={{ layout: 'horizontal' }}
              createOrder={(data, actions) => {
                return actions.order.create(
                  {
                    purchase_units: [
                      {
                        amount: {
                          value: subtotal + (subtotal * 9 / 100) + 15,
                          currency_code: 'USD'
                        }
                      }
                    ]
                  }
                )
              }

              }
            /> : null}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Checkout
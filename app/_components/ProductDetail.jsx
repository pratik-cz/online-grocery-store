'use client'
import { Button } from '@/components/ui/button'
import { LoaderCircle, ShoppingBag, ShoppingBasket } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { useRouter } from 'next/navigation'
import GlobalApi from '../_utils/GlobalApi'
import { toast } from 'sonner'
import { UpdateCartContext } from '../_context/UpdateCartContext'


const ProductDetail = ({ product }) => {
    const jwt = sessionStorage.getItem('jwt');
    const user = JSON.parse(sessionStorage.getItem('user'))
    const {updateCart,setUpdateCart}=useContext(UpdateCartContext)
    const [productTotalPrice, setProductTotalPrice] = useState(
        product.attributes.sellingPrice ?
            product.attributes.sellingPrice :
            product.attributes.mrp
    );
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const addToCart = () => {
        setLoading(true)
        if (!jwt) {
            router.push('/sign-in');
            return;
        }
        const data = {
            data: {
                quantity: quantity,
                amount: (quantity * productTotalPrice),
                products: product.id,
                users_permissions_users: user.id,
                userId: user.id 
            }
        }
        console.log(data)
        GlobalApi.addToCart(data, jwt).then((resp) => {
            console.log(resp)
            setLoading(false)
            setUpdateCart(!updateCart)
            toast('Added to cart')
        }, (e) => {
            setLoading(false)
            console.log(e)
            toast('Error while adding into cart')
        })
    }
    return (
        <div className='grid grid-cols-2 md:grid-cols-2
    p-7 bg-white text-black gap-10'>
            <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                product.attributes?.images?.data?.attributes?.formats.thumbnail.url}
                width={300}
                height={300}
                alt={product.attributes.name}
                className='border-2 p-5 h-[320px] w-[320px] object-contain rounded-lg'
            />
            <div className='flex flex-col gap-3 '>
                <h2 className='text-2xl font-bold'>{product.attributes.name}
                    <Badge variant="outline" className={'ml-3 p-2 px-5'}>{product.attributes.categories?.data[0]?.attributes?.name}</Badge>
                </h2>
                <h2 className='text-sm font-bold text-gray-500'>{product.attributes.description}</h2>
                <div className='flex justify-left gap-3 '>
                    {product.attributes.sellingPrice && <h2 className='font-bold text-xl md:text-3xl '>₹ {product.attributes.sellingPrice}</h2>}
                    <h2 className={product.attributes.sellingPrice ? 'line-through text-gray-600 font-bold text-xl md:text-3xl ' : 'font-bold text-xl md:text-3xl'}>₹ {product.attributes.mrp}</h2>
                </div>
                <h2 className='font-medium text-lg'>Quantity ({product.attributes.itemQtyType})</h2>
                <div className='flex flex-col items-baseline  gap-3'>
                    <div className='p-1 border flex gap-10 items-center px-5'>
                        <button className='text-2xl' disabled={quantity == 1} onClick={() => setQuantity(quantity - 1)}>-</button>
                        <h2>{quantity}</h2>
                        <button className='text-2xl' onClick={() => setQuantity(quantity + 1)}>+</button>
                    </div>
                    <div><h2 className='text-l font-bold'>Total : ₹ {(quantity * productTotalPrice).toFixed(2)} </h2></div>
                    <Button className="flex" onClick={() => addToCart()}>
                        <ShoppingBag ></ShoppingBag>
                        <span className='ml-3'>
                            {
                                loading?<LoaderCircle className="animate-spin"/>:'Add to Cart'
                            }
                            
                            </span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
"use client"
import { Button } from '@/components/ui/button'
import { CircleUserRound, LayoutGrid, Search, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import GlobalApi from '../_utils/GlobalApi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { UpdateCartContext } from '../_context/UpdateCartContext'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import CartItemList from './CartItemList'
import { toast } from 'sonner'

function Header() {
    const [categoryList, setCategoryList] = useState();
    
    const router = useRouter();
    const jwt = sessionStorage.getItem('jwt');
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [totalcartItem, setTotalCartItem] = useState(0)
    const [cartItemList, setCartItemList] = useState([])
    const { updateCart, setUpdateCart,isLoggedIn,setIsLoggedIn } = useContext(UpdateCartContext)
    const [subtotal, subSubTotal] = useState(0);
    useEffect(() => {
        getCategoryList()
        sessionStorage.getItem('jwt') ? setIsLoggedIn(true) : setIsLoggedIn(false)
    }, [])
    useEffect(() => {
        getCartItems()
    }, [updateCart])


    useEffect(() => {
        let total = 0;
        cartItemList.forEach(element => {
            total = total + element.amount;
        })
        subSubTotal(total)
    }, [cartItemList,isLoggedIn])
    const getCategoryList = () => {
        GlobalApi.getCategory().then(res => { setCategoryList(res.data.data) })
    }
    /**
     * used to get total cart item
     */
    const getCartItems = async () => {
        if (user) {
            const cartItemList_ = await GlobalApi.getCartItems(user?.id, jwt);
            console.log(cartItemList_);
            setTotalCartItem(cartItemList_?.length);
            setCartItemList(cartItemList_)
        }
    }
    const onSignOut = () => {
        sessionStorage.clear();
        setIsLoggedIn(false)
        router.push('/sign-in')
    }
    const onDeleteItem = (id, jwt) => {
        GlobalApi.deleteCartItem(id, jwt).then(resp => {
            toast('Item removed');
            getCartItems()
        })
    }
    return (
        <div className='p-5 shadow-sm flex justify-between'>
            <div className='flex items-center gap-8'>
                <Link href={'/'}>
                    <Image src="/logo.png" alt="logo" width={180} height={120} />
                </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <h2 className='hidden md:flex gap-2 items-center border rounded-full p-2 px-10 bg-slate-200 cursor-pointer'>
                            <LayoutGrid />
                            Category</h2>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                        <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {categoryList && categoryList.map((category, index) => (
                            <Link key={index} href={'/products-category/' + category.attributes?.name}>
                                <DropdownMenuItem className="cursor-pointer">
                                    <Image src={
                                        category.attributes.icon.data[0].attributes.url
                                        }
                                        unoptimized={true}
                                        alt='icon' width={25} height={25} className='mr-2' />
                                    <h2>{category.attributes.name}</h2>
                                </DropdownMenuItem>
                            </Link>

                        ))}

                    </DropdownMenuContent>
                </DropdownMenu>

                <div className='md:flex gap-3 items-center border rounded-full p-2 px-5 hidden '>
                    <Search />
                    <input type='text' placeholder='Search' className='outline-none' />
                </div>
            </div>
            <div className='flex gap-5 items-center '>
                <Sheet>
                    <SheetTrigger>
                        <h2 className='flex gap-2 items-center text-lg'><ShoppingBag />
                            <span className='bg-primary text-white  px-2 rounded-full'>
                                {totalcartItem}
                            </span>
                        </h2>
                    </SheetTrigger>
                    <SheetContent className='p-0'>
                        <SheetHeader>
                            <SheetTitle className="bg-slate-100 font-bold text-lg px-4 py-3">My Cart</SheetTitle>
                            <SheetDescription className='px-4 py-2'>
                                <CartItemList cartItemList={cartItemList} onDeleteItem={onDeleteItem} />
                            </SheetDescription>
                        </SheetHeader>
                        <SheetClose asChild>
                            <div className='absolute w-[90%] bottom-6 flex flex-col pl-6'>
                                <h2 className='text-lg font-bold flex justify-between'> Subtotal <span>₹ {subtotal.toFixed(2)}</span> </h2>
                                <Button className='mt-2' onClick={()=>router.push(jwt?'/checkout':'/sign-in')}>Checkout</Button>
                            </div>
                        </SheetClose>
                    </SheetContent>

                </Sheet>

                {!isLoggedIn ? <Link href={'/sign-in'}>
                    <Button>Login</Button>
                </Link> :
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <CircleUserRound className='bg-green-100 p-2 rounded-full text-primary w-12 h-12 cursor-pointer' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>My Orders</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onSignOut()}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                }
            </div>
        </div>

    )
}

export default Header
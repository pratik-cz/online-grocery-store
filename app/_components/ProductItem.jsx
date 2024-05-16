import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ProductDetail from './ProductDetail'
const ProductItem = ({ product }) => {
    return (
        <div className='p-2 md:p-6 flex flex-col items-center justify-center gap-3 border rounded-lg hover:scale-105 hover:shadow-lg transition-all ease-in-out'>
            <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                product.attributes?.images?.data?.attributes?.formats.thumbnail.url} width={500} height={200} alt={product.attributes.name}
                className='h-[200px] w-[200px] object-contain'
            />

            <h2>{product.attributes.name}</h2>
            <h2>
                {product.attributes.sellingPrice && <span className='mr-3'>₹ {product.attributes.sellingPrice}</span>}
                <span className={product.attributes.sellingPrice ? 'line-through' : ''}>₹ {product.attributes.mrp}</span>
            </h2>
            <Dialog>
                <DialogTrigger>
                    <Button variant="outline" className="text-primary hover:text-white hover:bg-primary">Add to cart</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogDescription>
                            <ProductDetail product={product} />
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default ProductItem
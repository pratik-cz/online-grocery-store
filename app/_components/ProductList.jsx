import React from 'react'
import ProductItem from './ProductItem'
import { Button } from '@/components/ui/button'

const ProductList = ({ products }) => {
    return (
        <div className='mt-5'>
            <h2 className='text-green-600 font-bold text-2xl'>Our Popular Products</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mt-5'>
                {
                    products && products.map((product, index) => (
                        <ProductItem key={index} product={product} />
                    ))
                }
            </div>
            
        </div>
    )
}

export default ProductList
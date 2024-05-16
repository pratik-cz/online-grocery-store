import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CategoryList = ({ categories }) => {
    // console.log(categories)
    return (
       <div className='mt-5'>
        <h2 className='text-green-600 font-bold text-2xl'>Shop by Category</h2>
        <div className='grid grid-cols-3 sm:grid-cols-4 
        md:grid-cols-6 lg:grid-cols-8 mt-4 gap-5 mt-2
        '>
            {
               categories &&  categories.map((category, index) => (
                   <Link href={'/products-category/'+category.attributes?.name} key={index} className='flex flex-col items-center bg-green-50 gap-2 p-4 rounded-lg group cursor-pointer hover:bg-green-600 '>
                     <Image className='group-hover:scale-125 transition-all ease-in-out'  src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                        category.attributes?.icon?.data[0]?.attributes?.url} width={50} height={50} alt={category.attributes.name} />
                    <h2 className='text-green-800 group-hover:text-white'>{category.attributes.name}</h2>
                   </Link>
                ))
            }
        </div>
       </div>
    )
}

export default CategoryList
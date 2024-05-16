import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const TopCategoryList = ({ categories }) => {
    return (
        <div> <div className='flex mt-4 gap-5 mt-2 overflow-auto mx-7  md:mx-20 justify-center'>
            {
                categories && categories.map((category, index) => (
                    <Link href={'/products-category/' + category.attributes?.name} key={index} className='flex flex-col items-center bg-green-50 gap-2 p-4 rounded-lg group cursor-pointer hover:bg-green-600 
                    w-[150px] min-w-[100px]
                    '>
                        <Image className='group-hover:scale-125 transition-all ease-in-out' src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                            category.attributes?.icon?.data[0]?.attributes?.url} width={50} height={50} alt={category.attributes.name} />
                        <h2 className='text-green-800 group-hover:text-white'>{category.attributes.name}</h2>
                    </Link>
                ))
            }
        </div>
        </div>
    )
}

export default TopCategoryList
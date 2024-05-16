import GlobalApi from '@/app/_utils/GlobalApi';
import React from 'react';
import TopCategoryList from '../_components/TopCategoryList';
import ProductList from '@/app/_components/ProductList';
async function ProductCategory({params}) {
    const productList= await GlobalApi.getProductsByCategory(params.categoryName)
    const categories = await GlobalApi.getCategoryList();
    // console.log(productList)
    return (
        <div>
            <h2 className='p-4 bg-primary text-white font-bold text-3xl text-center'>{params.categoryName}</h2>
            <TopCategoryList categories={categories}/>
            <div className='p-2 md:px-20'>
            <ProductList products={productList} />
            </div>
        </div>
    )
}
export default ProductCategory;
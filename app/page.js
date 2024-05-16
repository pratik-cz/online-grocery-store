
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import CategoryList from "./_components/CategoryList";
import ProductList from "./_components/ProductList";
import Banner from "./_components/Banner";
import Footer from "./_components/Footer";

export default async function Home() {
  const sliderList = await GlobalApi.getSlider();
  const categories = await GlobalApi.getCategoryList();
  const products = await GlobalApi.getProductList();
  // console.log(products)
  return (
    <>
      <div className="p-5 px-14">
        <Slider sliderList={sliderList} />
      </div>
      <div className="p-3 md:p-5 md:px-14">
        <CategoryList categories={categories} />
        <ProductList products={products} />
        <Banner />
        <Footer/>
      </div>
    </>
  );
}

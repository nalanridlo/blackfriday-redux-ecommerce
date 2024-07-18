import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import images from './../../utils/images';
import Title from "../../components/common/Tittle";
import Preloader from "../../components/common/Preloader";
import ProductList from "../../components/common/ProductList";
import { getProducts } from "../../redux/reducers/productReducers";
import FilterView from './../../components/common/FilterView';


function HomePage() {

const dispatch = useDispatch();
const { products, productsLoading, grid_view,priceSortType } = useSelector((state) => state.product);

useEffect(() => {
  dispatch(getProducts());
}
, [dispatch]);

if (productsLoading) {
  return <Preloader />;
}


  return (
    <main className='bg-secondary'>
      <section className='sc-banner'>
        <div className='banner-item h-100 img-cover'>
          <img src = {images.banner_1} alt = "banner_image" className='img-cover' />
        </div>
      </section>

      <section className='sc-wrapper py-5'>
        <Title title={"Our Products"} />
        <FilterView />
        <br /> <br />


        <ProductList products={products.products} viewMode={grid_view} filterType={priceSortType}/>
      </section>

      <ToastContainer />
    </main>

  )
}

export default HomePage
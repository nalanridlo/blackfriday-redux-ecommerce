import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductCategory } from '../../redux/reducers/productReducers';
import Title from '../../components/common/Tittle';
import Preloader from '../../components/common/Preloader';
import ProductList from '../../components/common/ProductList';


function CategoryProduct() {
  const {categoryKey} = useParams();
  const dispatch = useDispatch();

  const { products, productsLoading,grid_view } = useSelector((state) => state.product);
 

//variable categoryKeyList untuk menyimpan hasil filter dari products.products
  const categoryKeyList = products.products?.filter((product) => product.category === categoryKey);

  useEffect(() => {
    dispatch(getProductCategory(categoryKey));
  }, [dispatch,categoryKey]);

  return (
    <>
     <main className='bg-secondary'>
      <div className='container'>
        <div className='sc-wrapper py-5'>
          <Title title = {categoryKey} />
          {
            // tampilkan produk berdasarkan kategori yang telah dipilih
            productsLoading ? <Preloader /> : <ProductList products = {categoryKeyList} viewMode={grid_view} />
          }
        </div>
      </div>
    </main>
    </>
  )
}



export default CategoryProduct


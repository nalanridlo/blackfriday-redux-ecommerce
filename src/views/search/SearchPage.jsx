import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getSearchProducts } from '../../redux/reducers/productReducers';
import { useDispatch, useSelector } from 'react-redux';
import Title from '../../components/common/Tittle';
import ProductList from '../../components/common/ProductList';

function SearchPage() {
    const {searchKey} = useParams();
    console.log(searchKey);
    const dispatch = useDispatch();
    const { products, grid_view } = useSelector((state) => state.product);

 useEffect(() => {
    dispatch(getSearchProducts(searchKey));
    }
    , [searchKey,dispatch]);



  return (
    <main className='bg-secondary'>
    <div className='container'>
      <div className='sc-wrapper py-5'>
        <Title title = { "Your search results" } />
        <br /><br />
        <ProductList products = {products.products} viewMode={grid_view} />
      </div>
    </div>
  </main>
  )
}

export default SearchPage
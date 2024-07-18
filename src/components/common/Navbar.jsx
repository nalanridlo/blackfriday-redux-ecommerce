import { useCallback, useEffect, useState } from 'react'
import "../../styles/Navbar.scss";
import { ToastContainer } from 'react-toastify';
import { BsSearch, BsCaretDownFill } from "react-icons/bs";
import {HiShoppingBag} from "react-icons/hi";
import { AiOutlineBars } from "react-icons/ai";
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/reducers/productReducers';

function Navbar() {
    const { products } = useSelector((state) => state.product);
    //buatlah variable filterCategory untuk menyimpan hasil filter dari products.products
    const filterCategory = products.products?.filter((product, index, self) => self.findIndex(p => p.category === product.category) === index);
    //buatlah variable sliceCategory untuk menyimpan hasil filterCategory yang di slice dari index 0 sampai 6
    const sliceCategory = filterCategory?.slice(0,6);

  const [showCategory, setShowCategory] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const toggleCategory = useCallback(() => {
    setShowCategory(prevData => !prevData);
  }, []);
  
  const handleSearchTerm = useCallback((event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  }, []);
 

  useEffect(() => {
    dispatch(getProducts());
  }
  , [dispatch]);


  return (
    <>
    <nav className='navbar'>
   

      <div className='navbar-main bg-primary'>
        <div className='container'>
          <div className='navbar-main-top flex align-center justify-between'>
            <Link to = "/" className='navbar-brand'>
              <span className='text-yellow fs-26 fw-6'>My</span>
              <span className='text-white fs-26 fw-6'>ECommerce.</span>
            </Link>

            <form className='navbar-search-form'>
              <div className='input-group bg-white'>
                <input type = "text" placeholder='Search for Product, Brand or Category' className='form-control' onChange={(event) => handleSearchTerm(event)}/>
                <Link to = {`search/${searchTerm}`} className='btn btn-primary flex align-center text-white px-3'>
                  <BsSearch size = {15} />
                  <span className='fs-15 mx-2'>Search</span>
                </Link>
              </div>
            </form>

            <div className='navbar-basket text-white flex align-center'>
              <Link to = "/basket" className='basket-btn'>
                <HiShoppingBag size = {29} />
                <span className='basket-count flex align-center justify-center'>0</span>
              </Link>
              <div className='text-end basket-count'>
                <p className='text-uppercase fs-14'>my cart</p>
                <Link to = "/basket" className='fw-7'>$  &nbsp;
                <span className = "basket-amount">0</span>
                </Link>
              </div>
            </div>
          </div>

          <div className='navbar-main-bottom flex align-center justify-between'>
            <div className = "navbar-cats-wrapper">
              <div className='navbar-cats-btn flex align-center text-white px-2 py-2' onClick={toggleCategory}>
                <AiOutlineBars />
                <span className = "text-uppercase mx-3 fs-13">all categories</span>
                <BsCaretDownFill />
              </div>
             
              <ul className={`category-list ${showCategory ? 'show-category-list' : ''}`} onClick = {toggleCategory}>
                  
                  {
                    filterCategory?.map((product, idx) => {
                    return (
                      <li key={idx} className='category-item'>
                        <Link to={`/category/${product.category}`} className='text-uppercase fs-14'>{product.category}</Link>
                      </li>
                    )
                    })
                  }
              </ul>
            </div>
            
            <ul className = "navbar-nav flex align-center">
                 
                  {
                    sliceCategory?.map((product, idx) => {
                    return (
                      <li key={idx} className='nav-item'>
                        <Link to={`/category/${product.category}`} className='nav-link text-white'>{product.category}</Link>
                      </li>
                    )
                    } )
                  }
            </ul>
          </div>
        </div>
      </div>

      <ToastContainer />
    </nav>
    </>
  )
}

export default Navbar
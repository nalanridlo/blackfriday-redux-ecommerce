import './App.scss';
import { BrowserRouter, Route,  Routes } from "react-router-dom"
import HomePage from "./views/home/HomePage"
import Navbar from './components/common/Navbar';
import ProductSinglePage from './views/view_product/ProductSinglePage';
import Footer from './components/common/Footer';
import SearchPage from './views/search/SearchPage';
import CategoryProduct from './views/view_product/CategoryProduct';
import { useSelector } from 'react-redux';




function App() {
  const { grid_view } = useSelector((state) => state.product);

  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path = "products/:id" element = {<ProductSinglePage />} />
          <Route path = "category/:categoryKey" element = {<CategoryProduct />} grid_view={grid_view} />
          <Route path = "search/:searchKey" element = {<SearchPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App

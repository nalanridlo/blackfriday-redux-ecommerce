import "../../styles/ProductList.scss";
import { AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { priceSort, setGridView, setListView } from "../../redux/reducers/productReducers";
import { useEffect } from "react";
import Preloader from "./Preloader";

function ProductList({ products, viewMode, filterType }) {
  const filterDispatch = useDispatch();

  useEffect(() => {
    filterDispatch(priceSort(filterType));
    if (viewMode) {
      filterDispatch(setGridView());
    } else {
      filterDispatch(setListView());
    }
  }, [filterDispatch, viewMode, filterType]);

  const sortedProducts = () => {
    if (!Array.isArray(products)) {
      return [];
    }
  
    const copiedProducts = [...products]; 
    if (filterType === "LOW_TO_HIGH") {
      return copiedProducts.sort((a, b) => a.price - b.price);
    } else if (filterType === "HIGH_TO_LOW") {
      return copiedProducts.sort((a, b) => b.price - a.price);
    } else {
      return copiedProducts;
    }
  };
  

  const displayProducts = sortedProducts();


  return (
    <div className="products">
      <div className="container">
        <div className={`product-list ${viewMode ? "gridview" : "listview"}`}>
          {Array.isArray(displayProducts) && displayProducts.length > 0 ? (
            displayProducts.map((product) => (
              <Link to={`/products/${product.id}`} className="product-item" key={product.id}>
                <div className="product-item-img">
                  <img src={product.thumbnail} alt={product.title} className="img-cover" />
                  <div className="product-discount">{product.discountPercentage}<span>%</span></div>
                </div>
                <div className="product-item-body">
                  <span className="product-category">{product.category}</span>
                  <span className="product-title">{product.title}</span>
                  <div className="product-price">
                    <span className="fw-6 fs-16">$ &nbsp;{product.price}</span>
                    <span className="text-dark">Brand: {product.brand}</span>
                  </div>
                  <div className="product-item-bottom fs-12 flex align-center">
                    <div><span className="fw-6">Stock:</span> {product.stock}</div>
                    <div className="product-rating flex align-center"><AiOutlineStar />{product.rating}</div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <Preloader />
          )
          }
        </div>
      </div>
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.array,
  viewMode: PropTypes.bool,
  filterType: PropTypes.string
};

export default ProductList;

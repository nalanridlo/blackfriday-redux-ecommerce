import "../../styles/ProductList.scss";
import { BsFillGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {  setGridView, setListView } from "../../redux/reducers/productReducers";
import { priceSort } from './../../redux/reducers/productReducers';

function FilterView() {
  const filterDispatch = useDispatch();

  const handlePriceSort = (event) => {
    console.log(event.target.value);
    filterDispatch(priceSort(event.target.value));
  }

  const handleSetGridView = () => {
    filterDispatch(setGridView());
  };

  const handleSetListView = () => {
    filterDispatch(setListView());
  };

  return (
<>
<div className='filter-top'>
            <div className='container'>
                <div className='filter-top-content py-3 flex align-center justify-between bg-white px-3'>
                    <div className='filter-top-sort flex align-center'>
                        <p className='fs-13 text-dark'>Sort By:</p>
                        <select className='fs-13 mx-2 filter-select' onChange={handlePriceSort}>
                            <option defaultValue="BEST_MATCH" value = "BEST_MATCH">Best Match</option>
                            <option value = "LOW_TO_HIGH">Price low to high</option>
                            <option value = "HIGH_TO_LOW">Price high to low</option>
                        </select>
                    </div>
                    <div className='filter-top-view flex align-center '>
                        <p className='op-07 text-dark fs-13'>View: </p>
                        <button type = "button" className = "grid-btn" onClick={handleSetGridView} title = "Grid View">
                            <BsFillGridFill />| 
                        </button>
                        <button type = "button" className = "list-btn" onClick={handleSetListView} title = "List View">
                            <FaThList />
                        </button>
                    </div>
                </div>
            </div>
        </div>
</>
  )
}

export default FilterView
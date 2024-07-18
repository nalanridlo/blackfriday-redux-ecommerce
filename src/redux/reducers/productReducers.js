import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const getProducts = () => async (dispatch) => {
    dispatch(getAllProducts());
    try {
        const { data } = await axios.get("https://dummyjson.com/products?limit=100");
        dispatch(getAllProductsSuccess(data));
    } catch (error) {
        dispatch(getAllProductsError(error.message));
    }
}


export const getSingleProducts = (id) => async (dispatch) => {
    dispatch(getSingleProduct());
    try {
        const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
        dispatch(getSingleProductSuccess(data));
    } catch (error) {
        dispatch(getSingleProductError(error.message));
    }
}

export const getSearchProducts = (searchTerm) => async (dispatch) => {
    dispatch(getSearchProductsResult());
    try {
        const { data } = await axios.get(`https://dummyjson.com/products/search?q=${searchTerm}`);
        dispatch(getSearchProductsSuccess(data));
    } catch (error) {
        dispatch(getSearchProductsError(error.message));
    }

}

export const getListCategory = () => async (dispatch) => {
    dispatch(getCategoriesList());
    try {
        const { data } = await axios.get(`https://dummyjson.com/categories`);
        dispatch(getCategoriesListSuccess(data));
    } catch (error) {
        dispatch(getCategoriesListError(error.message));
    }
}

export const getProductCategory = (categoryKey) => async (dispatch) => {
    dispatch(getCategoryProducts());
    try {
        const { data } = await axios.get(`https://dummyjson.com/products/category/${categoryKey}`);
        dispatch(getCategoryProductsSuccess(data));
    } catch (error) {
        dispatch(getCategoryProductsError(error.message));
    }
}

export const setGridView = () => (dispatch) => {
    dispatch(SET_GRID_VIEW());
};

export const setListView = () => (dispatch) => {
    dispatch(SET_LIST_VIEW());
}

export const loadProducts = () => (dispatch, products) => {
    dispatch(LOAD_PRODUCTS(products));
}

//buatlah priceSort untuk mengurutkan harga dari rendah ke tinggi atau sebaliknya
export const priceSort = (priceSortType) => (dispatch) => {
    dispatch(PRICE_SORT(priceSortType));
}


export const ProductReducer = createSlice({
    name: "product",
    initialState: {
        products: [],
        productsLoading: false,
        productsError: false,
        productsErrorMsg: "",
        singleProduct: [],
        singleProductLoading: false,
        singleProductError: false,
        singleProductErrorMsg: "",
        grid_view: true,
        priceSortType: "BEST_MATCH",
    },
    reducers: {
        getAllProducts: (state) => {
        state.productsLoading = true;
        },
        getAllProductsSuccess: (state, action) => {
        state.products = action.payload;
        state.productsLoading = false;
        },
        getAllProductsError: (state, action) => {
        state.productsError = true;
        state.productsErrorMsg = action.payload;
        state.productsLoading = false;
        },
        getSingleProduct: (state) => {
        state.singleProductLoading = true;
        },
        getSingleProductSuccess: (state, action) => {
        state.singleProduct = action.payload;
        state.singleProductLoading = false;
        },
        getSingleProductError: (state, action) => {
        state.singleProductError = true;
        state.singleProductErrorMsg = action.payload;
        state.singleProductLoading = false;
        },
        getSearchProductsResult: (state) => {
            state.products = [];
        state.productsLoading = true;
        },
        getSearchProductsSuccess: (state, action) => {
        state.products = action.payload;
        state.productsLoading = false;
        },
        getSearchProductsError: (state, action) => {
        state.productsError = true;
        state.productsErrorMsg = action.payload;
        state.productsLoading = false;
        },
        getCategoriesList: (state) => {
            state.categoryLoading = true;
            state.categoryError = false;
        },
        getCategoriesListSuccess: (state, action) => {
            state.categories = action.payload;
            state.categoryLoading = false;
            state.categoryError = false;
        },
        getCategoriesListError: (state, action) => {
            state.categoryError = true;
            state.categoryErrorMsg = action.payload;
            state.categoryLoading = false;
        },
        getCategoryProducts: (state) => {
            state.categoryProductLoading = true;
            state.categoryProductError = false;
        },
        getCategoryProductsSuccess: (state, action) => {
            state.categoryProducts = action.payload;
            state.categoryProductLoading = false;
            state.categoryProductError = false;
        },
        getCategoryProductsError: (state, action) => {
            state.categoryProductError = true;
            state.categoryProductErrorMsg = action.payload;
            state.categoryProductLoading = false;
        },
        SET_GRID_VIEW: (state) => {
            state.grid_view = true;
        },
        SET_LIST_VIEW: (state) => {
            state.grid_view = false;
        },
        LOAD_PRODUCTS: (state, action) => {
            state.products = action.payload;
        },
        PRICE_SORT: (state, action) => {
            
            state.priceSortType = action.payload;
            if (Array.isArray(state.products)) {
              let sortByPrice = function (a, b) {
                if (action.payload === "LOW_TO_HIGH") {
                  return a.price - b.price;
                } else if (action.payload === "HIGH_TO_LOW") {
                  return b.price - a.price;
                } else {
                  return 0;
                }
              }
              state.products = [...state.products].sort(sortByPrice);
            }
          },
    },
    });

    export const {
        getAllProducts,
        getAllProductsSuccess,
        getAllProductsError,
        getSingleProduct,
        getSingleProductSuccess,
        getSingleProductError,
        getSearchProductsResult,
        getSearchProductsSuccess,
        getSearchProductsError,
        getCategoriesList,
        getCategoriesListSuccess,
        getCategoriesListError,
        getCategoryProducts,
        getCategoryProductsSuccess,
        getCategoryProductsError,
        SET_GRID_VIEW,
        SET_LIST_VIEW,
        LOAD_PRODUCTS,
        PRICE_SORT,
    } = ProductReducer.actions;

    export default ProductReducer.reducer;
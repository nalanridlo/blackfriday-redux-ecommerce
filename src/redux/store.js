import { configureStore } from '@reduxjs/toolkit'
import ProductReducer from "./reducers/productReducers"




export const store = configureStore({
    reducer: {  
      product: ProductReducer,

        
    },
});
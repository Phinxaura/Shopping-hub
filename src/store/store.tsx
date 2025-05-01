import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import modalreducer from './modalSlice';
import productreducer from './productSlice';
import cartReducer from './cartSlice';





const store  = configureStore({
        reducer : {
                category : categoryReducer,
                modal : modalreducer,
                product : productreducer,
                cart : cartReducer,
        }
})
export default store ;
import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from '../utils/status';

const initialState = {
    data : [],
    status : STATUS.IDLE,
    catProductAll:[],
    catProductAllStatus : STATUS.IDLE,
    catProductSingle : [],
    catProductSingleStatus:STATUS.IDLE
}


const categorySlice = createSlice(
    {
        name : 'category',
        initialState,
        reducers : {
            setCategories(state,action){
                state.data  = action.payload;
            },
            setStatus(state,action){
                state.status = action.payload;
            },
            setCategoriesProductAll(state:any,action:any){
                state.catProductAll.push(action.payload);
            },
            setCategoriesStatusAll(state,action){
                state.catProductAllStatus = action.payload;
            },
            setCategoriesProductSingle(state,action){
                state.catProductAll = action.payload;
            },
            setCategoriesStatusSingle(state,action){
                state.catProductSingleStatus  = action.payload
            },
}
    }
) 


export const { setCategories , setStatus , setCategoriesProductAll , setCategoriesStatusAll , setCategoriesProductSingle , setCategoriesStatusSingle } = categorySlice.actions; 
export default categorySlice.reducer;

export const fetchCategories =  () => {
    return async function fetchCategoryThunk(dispatch:any){
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response  = await fetch(`${BASE_URL}categories`);
            const data  = await response.json();
            dispatch(setCategories(data.slice(0,5)));
            dispatch(setStatus(data.IDLE));

        }
        catch(error){
            dispatch(setStatus(STATUS.ERROR));
        }
    }
}

export const fetchProductsByCategory = ( categoryID:any ,dataType:any ) =>{
    return async function fetchCategoryProductsThunk (dispatch:any){
        if(dataType === 'all'){
            dispatch(setCategoriesStatusAll(STATUS.LOADING));
        }
        if(dataType === 'single'){
            dispatch(setCategoriesStatusSingle(STATUS.LOADING));
        }
    
    
        try{
                const res = await fetch(`${BASE_URL}categories/${categoryID}/products`);
                const data  = await res.json();
            
                if(dataType === 'all'){
                    dispatch(setCategoriesProductAll(data.slice(0,10)));
                    dispatch(setCategoriesStatusAll(STATUS.IDLE));
                }
                if(dataType === 'single'){
                    dispatch(setCategoriesProductSingle(data.slice(0,20)));
                    dispatch(setCategoriesStatusSingle(STATUS.IDLE));
                }

        }catch(error){
            if(dataType === 'all'){
                dispatch(setCategoriesStatusAll(STATUS.ERROR));
            }
            if(dataType === 'single'){
                dispatch(setCategoriesProductSingle(STATUS.ERROR));
            }
        }
    }
}
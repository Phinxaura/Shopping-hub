import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    data : [],
    isModalVisible: false,
}

const modalSlice  = createSlice({
        name : 'modal',
        initialState,
        reducers : {
            setModalData(state,action){
                state.data = action.payload;
            },
            setIsModalVisible(state,action){
                state.isModalVisible = action.payload
            }
        }
});


export const { setModalData , setIsModalVisible } = modalSlice.actions;
export default modalSlice.reducer; 
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

    export const getBrands = createAsyncThunk('brand/getBrands' , async function(){
        try {
            let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
            return data
        } catch (error) {
            return error
        }

     })

  const brandSlice= createSlice({
    name:'brand',
    initialState:{
        data: null,
        isLoading: false ,
        error:null ,
    },
    extraReducers:function(builder){
        builder.addCase(getBrands.fulfilled , function(state , action){
          state.data=action.payload
          state.isLoading=false
          state.error=null

        })
        builder.addCase(getBrands.pending , function(state , action){
            state.data=null
            state.isLoading=true
            state.error=null
  
          })
          builder.addCase(getBrands.rejected , function(state , action){
            state.data=null
            state.isLoading=false
            state.error=action.payload
  
          })

    }

    
})
const brandReducer = brandSlice.reducer 
export default brandReducer;
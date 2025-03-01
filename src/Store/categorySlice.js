import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategory = createAsyncThunk("category/getCategory" , async function (){
    try {
      let{data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  
      return data
    } catch (error) {
        return error
    }
  })

  const categorySlice =  createSlice({
    name : 'category',
    initialState:{
        categorys:[],
        isloadin:false
    },
    
    extraReducers: function(builder){
        builder.addCase(getCategory.fulfilled , function(state , action){
            state.categorys=action.payload 
            state.isloadin=false
           
        })
        builder.addCase(getCategory.pending , function(state , action){
           
            state.isloadin=true
           
        })
        builder.addCase(getCategory.rejected , function(state , action){
          
            state.isloadin=false
            state.categorys=action.payload 
        })
    }
    })
    const categoryReducer = categorySlice.reducer 
    export default categoryReducer;




  


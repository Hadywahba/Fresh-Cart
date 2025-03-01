import { configureStore } from "@reduxjs/toolkit";
import brandReducer from "./brandSlice";
import categoryReducer from "./categorySlice";




 export const store =  configureStore({

    reducer:{
        brand:brandReducer ,
        category:categoryReducer ,
   
    }
})
import { CATEGORY_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const categoryApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAllCategories:builder.query({
            query:()=>({
                url:`${CATEGORY_URL}`,
                method:'GET'
            }),
            keepUnusedDataFor:5
        })
    })
})

export const {
    useGetAllCategoriesQuery,
}=categoryApiSlice
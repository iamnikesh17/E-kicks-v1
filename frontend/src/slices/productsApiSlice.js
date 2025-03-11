import { PRODUCT_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({category,page,rating,minPrice,maxPrice,keyword}) => ({
        url: `${PRODUCT_URL}`,
        method: "GET",
        params:{
          category,
          rating,
          minPrice,
          maxPrice,
          page,
          keyword,
        }
        // params: {
        //   category,
        //   rating,
        //   minPrice,
        //   maxPrice,
          // page,
        // },

      }),

      keepUnusedDataFor: 5,
    }),
    AdminFetchAllProducts:builder.query({
      query:({page})=>({
        url:`${PRODUCT_URL}/all-products`,
        method:'GET',
        params:{
          page
        }
      }),
      keepUnusedDataFor:5
    }),
    createProduct:builder.mutation({
      query:(product)=>({
        url:`${PRODUCT_URL}`,
        method:'POST',
        body:product,
        credentials:"include"
      }),
      invalidatesTags:["Product"]
    }),
    fetchSingleProduct:builder.query({
      query:(id)=>({
        url:`${PRODUCT_URL}/${id}`,
        method:'GET'
      }),
      keepUnusedDataFor:5
    }),
    updateProduct:builder.mutation({
      query:({id,formData})=>({
        url:`${PRODUCT_URL}/${id}`,
        method:'PUT',
        body:formData,
        credentials:"include"
      }),
      invalidatesTags:["Product"]
    }),
    deleteProduct:builder.mutation({
      query:(id)=>({
        url:`${PRODUCT_URL}/${id}`,
        method:'DELETE',
        credentials:"include"
      }),
      invalidatesTags:["Product"]
    })
  }),
});

export const { useGetAllProductsQuery
  , useAdminFetchAllProductsQuery,
  useCreateProductMutation,
  useFetchSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
 } = productsApiSlice;
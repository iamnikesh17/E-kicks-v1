import { ORDER_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const ordersApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createOrder:builder.mutation({
            query:({items,shippingPrice,itemsPrice,totalPrice,taxPrice,shippingAddress})=>({
                url:`${ORDER_URL}`,
                method:'POST',
                body:{items,shippingPrice,itemsPrice,totalPrice,taxPrice,shippingAddress},
                credentials:"include"
            }),
            invalidatesTags:["Order"]
        }),
        getMyOrders:builder.query({
            query:()=>({
                url:`${ORDER_URL}/my-orders`,
                method:'GET',
                credentials:"include"
            }),
            keepUnusedDataFor:5
        }),
        getOrderById:builder.query({
            query:(id)=>({
                url:`${ORDER_URL}/${id}`,
                method:'GET',
                credentials:"include"
            }),
            keepUnusedDataFor:5
        })
    })
})

export const {
    useCreateOrderMutation,
    useGetMyOrdersQuery,
    useGetOrderByIdQuery,
}=ordersApiSlice
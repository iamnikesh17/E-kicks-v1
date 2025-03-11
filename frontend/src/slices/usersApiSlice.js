import { USER_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const usersApiSlice=apiSlice.injectEndpoints({
        endpoints:(builder)=>({
            loginUser:builder.mutation({
                query:(data)=>({
                    url:`${USER_URL}/login`,
                    method:'POST',
                    body:data,
                    credentials:"include"
                }),
                invalidatesTags:["User"]
            }),
            logoutUser:builder.mutation({
                query:()=>({
                    url:`${USER_URL}/logout`,
                    method:'POST',
                    credentials:"include"
                }),
                invalidatesTags:["User"]
            }),
            updateProfile:builder.mutation({
                query:(data)=>({
                    url:`${USER_URL}`,
                    method:'PUT',
                    body:data,
                    credentials:"include"
                })
            }),
            getUserProfile:builder.query({
                query:()=>({
                    url:`${USER_URL}/profile`,
                    method:'GET',
                    credentials:"include"
                })
            })
        })
})

export const {
    useLoginUserMutation,
    useLogoutUserMutation,
    useUpdateProfileMutation,
    useGetUserProfileQuery,
}=usersApiSlice
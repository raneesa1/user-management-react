import { apiSlice } from "./apiSlice";
const USERS_URL = '/api/'

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data,
                credentials: 'include',
            })
        }),
        userLogout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/user_logout`,
                method: 'GET',

            }),
        }),
        signup: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/signup`,
                method: 'POST',
                body: data,
                credentials: 'include',
            })
        })
    })
})
export const { useLoginMutation, useSignupMutation, useUserLogoutMutation } = usersApiSlice
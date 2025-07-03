import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    endpoints: builder => ({
        getBooks: builder.query({
            query: () => '/books'
        }),
        getBorrows: builder.query({
            query: () => '/borrow-summary'
        })
    })
});

export const {useGetBooksQuery, useGetBorrowsQuery} = baseApi;
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    tagTypes: ['Book', 'Borrow'],
    endpoints: builder => ({
        getBooks: builder.query({
            query: () => '/books',
            providesTags: ['Book']
        }),
        createBook: builder.mutation({
            query: newBook => ({
                url: '/create-book',
                method: 'POST',
                body: newBook
            }),
            invalidatesTags: ['Book']
        }),
        updateBook: builder.mutation({
            query: ({ id, updatedBook }) => ({
                url: `/edit-book/${id}`,
                method: 'PUT',
                body: updatedBook
            }),
            invalidatesTags: ['Book'] // 🌀 UI auto-refresh
        }),
        deleteBook: builder.mutation({
            query: (id: string) => ({
                url: `/books/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Book']
        }),
        borrowBook: builder.mutation({
            query: ({ bookId, borrowerData }) => ({
                url: `/borrow/${bookId}`,
                method: 'POST',
                body: borrowerData
            }),
            invalidatesTags: ['Borrow', 'Book'] // 🌀 UI auto-refresh
        }),
        getBorrows: builder.query({
            query: () => '/borrow-summary',
            providesTags: ['Borrow']
        }),
        
    })
});

export const { useGetBooksQuery, useCreateBookMutation, useUpdateBookMutation, useBorrowBookMutation, useDeleteBookMutation, useGetBorrowsQuery } = baseApi;

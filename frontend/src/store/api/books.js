import { BOOK_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const bookSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => ({
        url: `${BOOK_URL}/all-books`,
      }),
    }),
    createBook: builder.mutation({
      query: (data) => ({
        url: `${BOOK_URL}/create-book`,
        method: "POST",
        body: data,
      }),
    }),
    updateBook: builder.mutation({
      query: ({ id, updatedBook }) => ({
        url: `${BOOK_URL}/update-book/${id}`,
        method: "PUT",
        body: updatedBook,
      }),
    }),
    addBookReview: builder.mutation({
      query: ({ id, rating, comment }) => ({
        url: `${BOOK_URL}/${id}/review`,
        method: "POST",
        body: { rating, id, comment },
      }),
    }),
    deleteComment: builder.mutation({
      query: ({ bookId, reviewId }) => ({
        url: `${BOOK_URL}/delete-comment`,
        method: "DELETE",
        body: { bookId, reviewId },
      }),
    }),
    getSpecificBook: builder.query({
      query: ({ id }) => `${BOOK_URL}/specific-book/${id}`,
    }),
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: formData,
      }),
    }),
    getNewBooks: builder.query({
      query: () => `${BOOK_URL}/new-books`,
    }),
    getTopBooks: builder.query({
      query: () => `${BOOK_URL}/top-books`,
    }),
    getRandomBooks: builder.query({
      query: `${BOOK_URL}/random-books`,
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useAddBookReviewMutation,
  useDeleteCommentMutation,
  useGetSpecificBookQuery,
  useUploadImageMutation,
  useGetNewBooksQuery,
  useGetTopBooksQuery,
  useGetRandomBooksQuery,
} = bookSlice;

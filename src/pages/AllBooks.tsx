import { useGetBooksQuery } from "@/redux/api/baseApi"
import type { IBook } from "@/types";

export default function AllBooks() {

  const { data, isLoading, isError } = useGetBooksQuery(undefined);

  // Check if data is still loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (isError) {
    return <div>Error loading books.</div>;
  }
  
  // console.log({ data, isLoading, isError });
  
  return (
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {!isLoading &&
              data.data.map((book: IBook) => (
                  <div key={book._id} className="border p-4 mb-4 rounded shadow">
                      <h2 className="text-xl font-bold dark:text-gray-200">{book.title}</h2>
                      <p className="text-gray-700 dark:text-gray-400">Author: {book.author}</p>
                      <p className="text-gray-600 dark:text-gray-400">Published: {book.createdAt}</p>
                      <p className="text-gray-500 dark:text-gray-400">ISBN: {book.isbn}</p>
                  </div>
              ))}
      </div>
  );
}

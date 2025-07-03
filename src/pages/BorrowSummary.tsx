import { useGetBorrowsQuery } from "@/redux/api/baseApi"
import type { IBorrow } from "@/types";

export default function BorrowSummary() {
  const { data, isLoading, isError } = useGetBorrowsQuery(undefined);

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading borrow summary.</div>
  }
console.log({ data, isLoading, isError });
  return (
     <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {!isLoading &&
                  data.data.map((borrow: IBorrow) => (
                      <div key={borrow._id} className="border p-4 mb-4 rounded shadow">
                          <h2 className="text-xl font-bold dark:text-gray-200">{borrow.book.title}</h2>
                          <p className="text-gray-700 dark:text-gray-400">ISBN: {borrow.book.isbn}</p>
                          <p className="text-gray-600 dark:text-gray-400">Total Quantity: {borrow.totalQuantity}</p>
                      </div>
                  ))}
          </div>
  )
}

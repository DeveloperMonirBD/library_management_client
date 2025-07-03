// import { useDeleteBookMutation, useGetBooksQuery } from '@/redux/api/baseApi';
// import type { IBook } from '@/types';
// import { Button } from '@/components/ui/button'; // shadcn/ui button component
// import { Pencil, Trash2, BookOpen } from 'lucide-react'; // optional icons

// export default function AllBooksTable() {
//   const { data, isLoading, isError } = useGetBooksQuery(undefined, {
//     // pollingInterval: 30000, // Poll every 30 seconds
//     refetchOnFocus: true, // Refetch when the window is focused
//     refetchOnMountOrArgChange: true, // Refetch when the component mounts or arguments change
//     refetchOnReconnect: true, // Refetch when the browser reconnects
//   });
  
//   const [handleDelete] = useDeleteBookMutation();

//     if (isLoading) return <div>Loading...</div>;
//     if (isError) return <div>Error loading books.</div>;

//     return (
//         <div className="p-4 overflow-x-auto w-full">
//             <table className="min-w-full table-auto border border-gray-300 text-sm">
//                 <thead className="sticky top-0 bg-gray-100 dark:bg-gray-800 z-10">
//                     <tr>
//                         <th className="px-2 py-2 md:px-4 md:py-2 text-xs md:text-sm">Title</th>
//                         <th className="px-2 py-2 md:px-4 md:py-2 text-xs md:text-sm">Author</th>
//                         <th className="px-2 py-2 md:px-4 md:py-2 text-xs md:text-sm">Genre</th>
//                         <th className="px-2 py-2 md:px-4 md:py-2 text-xs md:text-sm">ISBN</th>
//                         <th className="px-2 py-2 md:px-4 md:py-2 text-xs md:text-sm">Copies</th>
//                         <th className="px-2 py-2 md:px-4 md:py-2 text-xs md:text-sm">Availability</th>
//                         <th className="px-2 py-2 md:px-4 md:py-2 text-xs md:text-sm">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.data.map((book: IBook) => {
//                         const isAvailable = book.copies > 0;

//                         return (
//                             <tr key={book._id} className="border-b dark:border-gray-700">
//                                 <td className="px-2 py-2 text-xs md:text-sm">{book.title}</td>
//                                 <td className="px-2 py-2 text-xs md:text-sm">{book.author}</td>
//                                 <td className="px-2 py-2 text-xs md:text-sm">{book.genre}</td>
//                                 <td className="px-2 py-2 text-xs md:text-sm">{book.isbn}</td>
//                                 <td className="px-2 py-2 text-xs md:text-sm">{book.copies}</td>
//                                 <td className="px-2 py-2 text-xs md:text-sm">
//                                     <span className={`px-2 py-1 text-sm rounded ${isAvailable ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
//                                         {isAvailable ? 'Available' : 'Unavailable'}
//                                     </span>
//                                 </td>
//                                 <td className="px-4 py-2 space-x-2 space-y-2 md:space-y-1">
//                                     <Button variant="outline" size="sm" onClick={() => handleEdit(book)}>
//                                         <Pencil className="h-4 w-4 mr-1" />
//                                         Edit
//                                     </Button>
//                                     <Button variant="destructive" size="sm" onClick={() => handleDelete(book._id)}>
//                                         <Trash2 className="h-4 w-4 mr-1" />
//                                         Delete
//                                     </Button>
//                                     <Button variant="default" size="sm" onClick={() => handleBorrow(book._id)}>
//                                         <BookOpen className="h-4 w-4 mr-1" />
//                                         Borrow
//                                     </Button>
//                                 </td>
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </table>
//         </div>
//     );
// }




// pages/AllBooksTable.tsx
import { useState } from "react";
import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types";

import { Button } from "@/components/ui/button";
import { Pencil, Trash2, BookOpen } from "lucide-react";
import EditBookModal from "./EditBookModal";

export default function AllBooksTable() {
  const { data, isLoading, isError } = useGetBooksQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const [handleDelete] = useDeleteBookMutation();
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);

  const handleEdit = (book: IBook) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading books.</div>;

  return (
    <div className="p-4 overflow-x-auto w-full">
      <table className="min-w-full table-auto border border-gray-300 text-sm">
        <thead className="sticky top-0 bg-gray-100 dark:bg-gray-800 z-10">
          <tr>
            <th className="px-2 py-2">Title</th>
            <th className="px-2 py-2">Author</th>
            <th className="px-2 py-2">Genre</th>
            <th className="px-2 py-2">ISBN</th>
            <th className="px-2 py-2">Copies</th>
            <th className="px-2 py-2">Availability</th>
            <th className="px-2 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((book: IBook) => {
            const isAvailable = book.copies > 0;

            return (
              <tr key={book._id} className="border-b dark:border-gray-700">
                <td className="px-2 py-2">{book.title}</td>
                <td className="px-2 py-2">{book.author}</td>
                <td className="px-2 py-2">{book.genre}</td>
                <td className="px-2 py-2">{book.isbn}</td>
                <td className="px-2 py-2">{book.copies}</td>
                <td className="px-2 py-2">
                  <span className={`px-2 py-1 rounded ${isAvailable ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                    {isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(book)}>
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(book._id)}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                  <Button variant="default" size="sm">
                    <BookOpen className="h-4 w-4 mr-1" />
                    Borrow
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* 🔓 Modal Injection */}
      {selectedBook && (
        <EditBookModal book={selectedBook} isOpen={true} onClose={closeModal} />
      )}
    </div>
  );
}

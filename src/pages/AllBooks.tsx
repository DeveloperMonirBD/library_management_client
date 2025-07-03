import { Button } from '@/components/ui/button';
import { useDeleteBookMutation, useGetBooksQuery } from '@/redux/api/baseApi';
import type { IBook } from '@/types';
import { BookOpen, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import BorrowBookForm from './BorrowBookForm';
import EditBookModal from './EditBookModal';
import { toast } from 'sonner';

export default function AllBooksTable() {
    const { data, isLoading, isError } = useGetBooksQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true
    });

    const [deleteBook] = useDeleteBookMutation();
    const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
    const [borrowId, setBorrowId] = useState<string | null>(null);
    const [availableCopies, setAvailableCopies] = useState<number>(0);

    const handleEdit = (book: IBook) => setSelectedBook(book);
    const closeEditModal = () => setSelectedBook(null);

    const openBorrowForm = (book: IBook) => {
        setBorrowId(book._id);
        setAvailableCopies(book.copies);
    };
    const closeBorrowForm = () => {
        setBorrowId(null);
        setAvailableCopies(0);
    };

    const handleDelete = async (id: string) => {
        toast('Are you sure you want to delete this book?', {
            action: {
                label: 'Yes, delete it',
                onClick: async () => {
                    try {
                        await deleteBook(id).unwrap();
                        toast.success('🗑️ Book deleted successfully');
                    } catch (error) {
                        toast.error('❌ Failed to delete book.');
                        console.error('Delete book failed:', error);
                    }
                }
            },
            cancel: {
                label: "Cancel",
                onClick: () => {}
            }
        })
        
    }

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading books.</div>;

    return (
        <div className="p-4 overflow-x-auto w-full">
            <table className="min-w-full table-auto border border-gray-300 text-sm sm:text-base">
                <thead className="sticky top-0 bg-gray-100 dark:bg-gray-800 z-10">
                    <tr>
                        <th className="px-2 py-2">Title</th>
                        <th className="px-2 py-2">Author</th>
                        <th className="px-2 py-2">Genre</th>
                        <th className="px-2 py-2 hidden sm:table-cell">ISBN</th>
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
                                <td className="px-2 py-2 hidden sm:table-cell">{book.isbn}</td>
                                <td className="px-2 py-2">{book.copies}</td>
                                <td className="px-2 py-2">
                                    <span className={`px-2 py-1 rounded text-sm ${isAvailable ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>{isAvailable ? 'Available' : 'Unavailable'}</span>
                                </td>
                                <td className="px-4 py-2 space-x-2 space-y-2 md:space-y-0">
                                    <Button variant="outline" size="sm" onClick={() => handleEdit(book)}>
                                        <Pencil className="h-4 w-4 mr-1" />
                                        Edit
                                    </Button>
                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(book._id)}>
                                        <Trash2 className="h-4 w-4 mr-1" />
                                        Delete
                                    </Button>
                                    <Button variant="default" size="sm" onClick={() => openBorrowForm(book)}>
                                        <BookOpen className="h-4 w-4 mr-1" />
                                        Borrow
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* ✏️ Edit Modal */}
            {selectedBook && <EditBookModal book={selectedBook} isOpen={true} onClose={closeEditModal} />}

            {/* 📘 Borrow Modal */}
            {borrowId && <BorrowBookForm bookId={borrowId} availableCopies={availableCopies} isOpen={true} onClose={closeBorrowForm} />}
        </div>
    );
}

export interface IBook {
    _id: string;
    title: string;
    image: string;
    author: string;
    genre: 'SCIENCE' | 'FICTION' | 'BIOGRAPHY' | 'HISTORY' | 'OTHER';
    isbn: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    copies: number;
    available: boolean;
}

export interface IBorrow {
    id: string;
    bookId: string;
    userId: string;
    borrowDate: string;
    returnDate: string | null;
    status: 'BORROWED' | 'RETURNED';
}

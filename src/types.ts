export interface IBook {
    _id: string;
    title: string;
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
    _id: string;
    totalQuantity: number;
    availableQuantity: number;
    book: {
        title: string;
        isbn: string;
    };
    bookId: string;
    userId: string;
    borrowDate: string;
    returnDate: string | null;
    status: 'BORROWED' | 'RETURNED';
}
  

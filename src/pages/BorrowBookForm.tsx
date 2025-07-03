import { useState } from 'react';
import { useBorrowBookMutation } from '@/redux/api/baseApi';
import { useNavigate } from 'react-router';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Props {
    bookId: string;
    availableCopies: number;
    isOpen: boolean;
    onClose: () => void;
}

export default function BorrowBookForm({ bookId, availableCopies, isOpen, onClose }: Props) {
    const [quantity, setQuantity] = useState(1);
    const [dueDate, setDueDate] = useState('');
    const [borrowBook, { isLoading, isError, error }] = useBorrowBookMutation();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (quantity > availableCopies) {
            toast.error(`Only ${availableCopies} copies available`);
            return;
        }

        const borrowerData = {
            quantity,
            dueDate: new Date(dueDate).toISOString()
        };

        try {
            await borrowBook({ bookId, borrowerData }).unwrap();
            toast.success('📚 Book borrowed successfully!');
            onClose();
            navigate('/borrow-summary');
        } catch (error) {
            toast.error('❌ Borrowing failed.');
            console.error('Borrowing failed:', error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Borrow Book</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input type="number" min={1} max={availableCopies} placeholder="Quantity to borrow" value={quantity} onChange={e => setQuantity(Number(e.target.value))} required />
                    <Input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Processing...' : 'Confirm Borrow'}
                    </Button>
                    {isError && <p className="text-red-600 text-sm">{(error as any)?.data?.message || 'Something went wrong. Please try again.'}</p>}
                </form>
            </DialogContent>
        </Dialog>
    );
}

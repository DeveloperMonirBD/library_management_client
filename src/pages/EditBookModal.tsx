import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

import { useState, useEffect } from 'react';
import type { IBook } from '@/types';
import { useUpdateBookMutation } from '@/redux/api/baseApi';
import { toast } from 'sonner'; 

interface Props {
    book: IBook;
    isOpen: boolean;
    onClose: () => void;
}

export default function EditBookModal({ book, isOpen, onClose }: Props) {
    const [formData, setFormData] = useState<IBook>(book);
    const [updateBook, { isLoading, isError }] = useUpdateBookMutation();

    useEffect(() => {
        setFormData(book); // Update form state if props change
    }, [book]);

    const handleChange = (field: keyof IBook, value: string | number | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updatedBook = {
            ...formData,
            available: formData.copies > 0 // ✅ Business rule: available if copies > 0
        };

        try {
            await updateBook({ id: book._id, updatedBook }).unwrap();
            toast.success('📘 Book updated successfully!');
            onClose(); // ✅ Close modal after successful update
        } catch (error) {
            toast.error('❌ Failed to update book.');
            console.error('Book update failed:', error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Book</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input placeholder="Title" value={formData.title} onChange={e => handleChange('title', e.target.value)} required />
                    <Input placeholder="Author" value={formData.author} onChange={e => handleChange('author', e.target.value)} required />
                    <Select value={formData.genre} onValueChange={value => handleChange('genre', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Genre" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="SCIENCE">Science</SelectItem>
                            <SelectItem value="FICTION">Fiction</SelectItem>
                            <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                            {/* Add more genres as needed */}
                        </SelectContent>
                    </Select>
                    <Input placeholder="ISBN" value={formData.isbn} onChange={e => handleChange('isbn', e.target.value)} required />
                    <Textarea placeholder="Description" value={formData.description} onChange={e => handleChange('description', e.target.value)} required />
                    <Input type="number" min={0} placeholder="Copies" value={formData.copies} onChange={e => handleChange('copies', Number(e.target.value))} />
                    <div className="flex items-center space-x-2">
                        <Checkbox id="available" checked={formData.copies > 0} onCheckedChange={checked => handleChange('available', checked === true)} />
                        <Label htmlFor="available">Available</Label>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Updating...' : 'Update Book'}
                    </Button>
                    {isError && <p className="text-red-600 text-sm">Error updating book. Please try again.</p>}
                </form>
            </DialogContent>
        </Dialog>
    );
}

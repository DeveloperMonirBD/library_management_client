import { useState } from 'react';
import { useCreateBookMutation } from '@/redux/api/baseApi';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export default function AddBook() {
    const navigate = useNavigate();
    const [createBook, { isLoading, isError }] = useCreateBookMutation();

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
        isbn: '',
        description: '',
        copies: 1,
        available: true
    });

    const handleChange = (field: string, value: string | number | boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createBook(formData).unwrap();
            toast.success('📘 Book added successfully!');
            navigate('/all-books');
        } catch (error) {
            toast.error('❌ Failed to create book. Please try again.');
            console.error('Failed to create book:', error);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 rounded shadow">
            <h2 className="text-2xl font-bold mb-6 text-center">Add New Book</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input placeholder="Title" value={formData.title} onChange={e => handleChange('title', e.target.value)} required />
                <Input placeholder="Author" value={formData.author} onChange={e => handleChange('author', e.target.value)} required />

                <Select onValueChange={value => handleChange('genre', value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Genre" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="SCIENCE">Science</SelectItem>
                        <SelectItem value="FICTION">Fiction</SelectItem>
                        <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                    </SelectContent>
                </Select>

                <Input placeholder="ISBN" value={formData.isbn} onChange={e => handleChange('isbn', e.target.value)} required />

                <Textarea placeholder="Description" value={formData.description} onChange={e => handleChange('description', e.target.value)} required />

                <Input type="number" min={0} placeholder="Copies" value={formData.copies} onChange={e => handleChange('copies', Number(e.target.value))} />

                <div className="flex items-center space-x-2">
                    <Checkbox id="available" checked={formData.available} onCheckedChange={checked => handleChange('available', checked)} />
                    <Label htmlFor="available">Available</Label>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Create Book'}
                </Button>

                {isError && <p className="text-red-600 text-sm">Error creating book. Please try again.</p>}
            </form>
        </div>
    );
}

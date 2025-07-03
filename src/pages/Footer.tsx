import { Link } from 'react-router';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <div className="hidden md:flex items-center">
                            &copy; 2025
                            <span className="ml-2 font-bold text-sm"> Library</span>Management. All rights reserved.
                        </div>
                    </Link>
                    <p className="text-sm"></p>
                </div>
                <ul className="flex space-x-4 text-sm">
                    <li>
                        <Link to="/all-books">All Books</Link>
                    </li>
                    <li>
                        <Link to="/add-book">Add Book</Link>
                    </li>
                    <li>
                        <Link to="/borrow-summary">Borrow Summary</Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

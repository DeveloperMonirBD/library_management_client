'use client';

import { ModeToggle } from '@/mode-toggle';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import logo from '../../assets/logo.svg';

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Link } from 'react-router';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="w-full border-b bg-background px-5">
            <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <img src={logo} alt="Logo" className="h-8 w-auto" />
                    <div className="hidden md:flex items-center">
                        <span className="ml-2 font-bold text-lg">Library</span>Management
                    </div>
                </Link>

                {/* Toggle button for mobile */}
                <button className="md:hidden ml-3" onClick={() => setMobileMenuOpen(prev => !prev)} aria-label="Toggle Mobile Menu">
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-4">
                    {/* Desktop Nav */}
                    <NavigationMenu>
                        <NavigationMenuList className="hidden md:flex gap-4 text-sm font-medium">
                            {['/', '/all-books', '/add-book', '/borrow-summary'].map((path, i) => (
                                <NavigationMenuItem key={path}>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link to={path}>{['Home', 'All Books', 'Add Books', 'Borrow Summary'][i]}</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* Theme toggle */}
                    <div className="hidden md:block ml-auto">
                        <ModeToggle />
                    </div>
                </div>
            </div>

            {/* Mobile Menu Content */}
            {mobileMenuOpen && (
                <div className="md:hidden flex flex-col gap-3 py-3 text-sm font-medium">
                    <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                        Home
                    </Link>
                    <Link to="/all-books" onClick={() => setMobileMenuOpen(false)}>
                        All Books
                    </Link>
                    <Link to="/add-book" onClick={() => setMobileMenuOpen(false)}>
                        Add Books
                    </Link>
                    <Link to="/borrow-summary" onClick={() => setMobileMenuOpen(false)}>
                        Borrow Summary
                    </Link>
                    <ModeToggle />
                </div>
            )}
        </nav>
    );
}

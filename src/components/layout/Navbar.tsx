
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-education-primary">Aditya's Learning Hub</span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="p-2 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-gray-600" />
          ) : (
            <Menu className="w-6 h-6 text-gray-600" />
          )}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex md:items-center md:space-x-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-education-primary">
            Home
          </Link>
          <Link to="/courses" className="text-sm font-medium transition-colors hover:text-education-primary">
            Courses
          </Link>
          <Link to="/subjects" className="text-sm font-medium transition-colors hover:text-education-primary">
            Subjects
          </Link>
          <Button asChild variant="default" className="bg-education-primary hover:bg-education-primary/90">
            <Link to="/login">Login</Link>
          </Button>
        </nav>

        {/* Mobile navigation */}
        {isOpen && (
          <div className="absolute top-16 left-0 right-0 z-50 flex flex-col p-4 pt-2 pb-4 bg-white border-b shadow-sm md:hidden animate-fade-in">
            <Link
              to="/"
              className="px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Courses
            </Link>
            <Link
              to="/subjects"
              className="px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Subjects
            </Link>
            <div className="p-2">
              <Button asChild variant="default" className="w-full bg-education-primary hover:bg-education-primary/90">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

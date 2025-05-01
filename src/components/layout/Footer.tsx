
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container px-4 py-8 mx-auto sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-education-primary">Aditya's Learning Hub</h3>
            <p className="mt-2 text-sm text-gray-600">
              Empowering Class 10th students with quality education and resources.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 transition-colors hover:text-education-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-sm text-gray-600 transition-colors hover:text-education-primary">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/subjects" className="text-sm text-gray-600 transition-colors hover:text-education-primary">
                  Subjects
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Contact</h3>
            <ul className="mt-2 space-y-2">
              <li className="text-sm text-gray-600">Email: contact@adityaslearninghub.com</li>
              <li className="text-sm text-gray-600">Phone: +91 98765 43210</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-gray-200">
          <p className="text-sm text-center text-gray-500">
            &copy; {new Date().getFullYear()} Aditya's Learning Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

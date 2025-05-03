
import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { subjects } from '@/data/subjects';

const Subjects = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b">
          <div className="container px-4 py-3 mx-auto sm:px-6">
            <div className="flex items-center space-x-2 text-sm">
              <Link to="/" className="text-gray-500 hover:text-gray-700">
                <Home className="w-4 h-4" />
              </Link>
              <span className="text-gray-500">/</span>
              <span className="font-medium text-gray-900">Subjects</span>
            </div>
          </div>
        </div>

        {/* Hero section */}
        <section className="py-12 bg-white">
          <div className="container px-4 mx-auto sm:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold">Explore Subjects</h1>
              <p className="mt-4 text-xl text-gray-600">
                Comprehensive curriculum for Class 10th covering all major subjects
              </p>
            </div>
          </div>
        </section>

        {/* Subjects Grid */}
        <section className="py-12 bg-gray-50">
          <div className="container px-4 mx-auto sm:px-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {subjects.map((subject) => (
                <Link 
                  key={subject.id} 
                  to={`/subject/${subject.id}`}
                  className="subject-card group"
                >
                  <div className={`absolute top-0 left-0 w-2 h-full ${subject.color}`}></div>
                  <div className="flex flex-col h-full">
                    <div className="flex items-center mb-4">
                      <div className={`flex items-center justify-center w-10 h-10 text-lg rounded-full ${subject.color}`}>
                        {subject.icon}
                      </div>
                      <h3 className="ml-3 text-xl font-semibold">{subject.name}</h3>
                    </div>
                    <p className="mb-4 text-sm text-gray-600">{subject.description}</p>
                    <div className="mt-auto text-sm font-medium">
                      <span className="text-education-primary group-hover:underline">
                        {subject.chapters.length} Chapters
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Learning Approach */}
        <section className="py-12 bg-white">
          <div className="container px-4 mx-auto sm:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold">Our Learning Approach</h2>
              <p className="mt-4 text-gray-600">
                Each subject is structured to provide a complete learning experience with video lectures, 
                comprehensive notes, daily practice problems, and regular tests to ensure thorough 
                understanding and retention.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Subjects;

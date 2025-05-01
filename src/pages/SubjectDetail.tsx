
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Home } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { subjects, getSubjectById } from '@/data/subjects';

const SubjectDetail = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const subject = getSubjectById(subjectId || '');

  if (!subject) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Subject not found</h1>
            <Link to="/subjects" className="mt-4 text-education-primary hover:underline">
              Back to Subjects
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
              <Link to="/subjects" className="text-gray-500 hover:text-gray-700">
                Subjects
              </Link>
              <span className="text-gray-500">/</span>
              <span className="font-medium text-gray-900">{subject.name}</span>
            </div>
          </div>
        </div>

        {/* Subject Header */}
        <section className={`py-12 ${subject.colorLight}`}>
          <div className="container px-4 mx-auto sm:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-16 h-16 text-2xl rounded-full ${subject.color} text-white`}>
                  {subject.icon}
                </div>
                <div className="ml-6">
                  <h1 className="text-3xl font-bold">{subject.name}</h1>
                  <p className="mt-2 text-lg text-gray-600">{subject.description}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chapters Grid */}
        <section className="py-12 bg-white">
          <div className="container px-4 mx-auto sm:px-6">
            <h2 className="mb-8 text-2xl font-bold">Chapters</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {subject.chapters.map((chapter) => (
                <Link
                  key={chapter.id}
                  to={`/subject/${subject.id}/chapter/${chapter.id}`}
                  className="chapter-card group"
                >
                  <div className={`absolute top-0 left-0 w-1 h-full ${subject.color}`}></div>
                  <div className="flex flex-col">
                    <h3 className="text-lg font-medium">{chapter.number}. {chapter.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{chapter.description}</p>
                    <p className="mt-4 text-sm font-medium text-education-primary group-hover:underline">
                      View Chapter
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Learning Resources */}
        <section className="py-12 bg-gray-50">
          <div className="container px-4 mx-auto sm:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold">Complete Learning Resources</h2>
              <p className="mt-4 text-gray-600">
                Each chapter includes comprehensive video lectures, notes, daily practice problems, 
                quizzes, and solutions to help you master the subject completely.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SubjectDetail;

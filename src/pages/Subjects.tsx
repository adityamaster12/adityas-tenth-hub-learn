
import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const subjects = [
  {
    id: "physics",
    name: "Physics",
    color: "bg-education-physics",
    description: "Study of matter, energy, and the interaction between them",
    chapters: 10,
    icon: "⚛️"
  },
  {
    id: "chemistry",
    name: "Chemistry",
    color: "bg-education-chemistry",
    description: "Study of composition, structure, properties, and change of matter",
    chapters: 10,
    icon: "🧪"
  },
  {
    id: "biology",
    name: "Biology",
    color: "bg-education-biology",
    description: "Study of living organisms and their interactions",
    chapters: 10,
    icon: "🧬"
  },
  {
    id: "mathematics",
    name: "Mathematics",
    color: "bg-education-mathematics",
    description: "Study of numbers, quantity, structure, space, and change",
    chapters: 10,
    icon: "➗"
  },
  {
    id: "sst",
    name: "Social Studies",
    color: "bg-education-sst",
    description: "Study of society, relationships among individuals, and history",
    chapters: 10,
    icon: "🌍"
  },
  {
    id: "english",
    name: "English",
    color: "bg-education-english",
    description: "Study of language, literature, and composition",
    chapters: 10,
    icon: "📚"
  },
  {
    id: "hindi-a",
    name: "Hindi Course A",
    color: "bg-education-hindi",
    description: "Study of Hindi language, literature, and composition (Course A)",
    chapters: 10,
    icon: "🗣️"
  },
  {
    id: "hindi-b",
    name: "Hindi Course B",
    color: "bg-education-hindi",
    description: "Study of Hindi language, literature, and composition (Course B)",
    chapters: 10,
    icon: "📝"
  },
];

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
                        {subject.chapters} Chapters
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

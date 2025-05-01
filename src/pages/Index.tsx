
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Calendar, Video } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-r from-education-primary to-education-secondary">
          <div className="container px-4 mx-auto sm:px-6">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Expert Education for Class 10th Students
              </h1>
              <p className="mt-6 text-xl">
                Comprehensive learning resources to help you excel in your studies and achieve academic success.
              </p>
              <div className="mt-10">
                <Button asChild size="lg" className="bg-white text-education-primary hover:bg-gray-100">
                  <Link to="/subjects">Explore Subjects</Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-wave-pattern bg-repeat-x bg-contain"></div>
        </section>

        {/* Features section */}
        <section className="py-16 bg-white">
          <div className="container px-4 mx-auto sm:px-6">
            <h2 className="text-3xl font-bold text-center">Why Choose Our Platform?</h2>
            <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-3">
              <div className="flex flex-col items-center p-6 text-center rounded-lg shadow-sm">
                <div className="p-3 rounded-full bg-education-light">
                  <Video className="w-6 h-6 text-education-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">Live Classes</h3>
                <p className="mt-2 text-gray-600">
                  Attend two interactive live classes daily with expert teachers.
                </p>
              </div>

              <div className="flex flex-col items-center p-6 text-center rounded-lg shadow-sm">
                <div className="p-3 rounded-full bg-education-light">
                  <BookOpen className="w-6 h-6 text-education-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">Comprehensive Study Material</h3>
                <p className="mt-2 text-gray-600">
                  Access detailed notes, practice problems, and test papers for thorough preparation.
                </p>
              </div>

              <div className="flex flex-col items-center p-6 text-center rounded-lg shadow-sm">
                <div className="p-3 rounded-full bg-education-light">
                  <Calendar className="w-6 h-6 text-education-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">Flexible Learning</h3>
                <p className="mt-2 text-gray-600">
                  Multiple batches available to fit your schedule with free access to all.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Motivation section */}
        <section className="py-16 bg-education-light">
          <div className="container px-4 mx-auto sm:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold">Your Success Journey Starts Here</h2>
              <p className="mt-4 text-lg text-gray-600">
                Join thousands of students who have improved their academic performance and achieved their goals with our structured learning approach.
              </p>
              <div className="mt-8">
                <Button asChild className="bg-education-primary hover:bg-education-primary/90">
                  <Link to="/courses">
                    Explore Courses <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="container px-4 mx-auto sm:px-6">
            <h2 className="text-3xl font-bold text-center">Student Success Stories</h2>
            <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2">
              <div className="p-6 bg-gray-50 rounded-lg">
                <p className="italic text-gray-600">
                  "The structured approach and daily practice problems helped me understand complex topics easily. I improved my grades significantly."
                </p>
                <p className="mt-4 font-semibold">- Aarav Sharma, CBSE</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <p className="italic text-gray-600">
                  "The video lectures explain concepts so clearly. The notes provided are comprehensive and helped me score 95% in my exams."
                </p>
                <p className="mt-4 font-semibold">- Priya Patel, ICSE</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-12 bg-gradient-to-r from-education-primary to-education-secondary">
          <div className="container px-4 mx-auto sm:px-6">
            <div className="flex flex-col items-center justify-between md:flex-row">
              <div className="text-center text-white md:text-left">
                <h2 className="text-2xl font-bold">Ready to excel in your studies?</h2>
                <p className="mt-2">Join our platform and start learning today.</p>
              </div>
              <div className="mt-6 md:mt-0">
                <Button asChild size="lg" className="bg-white text-education-primary hover:bg-gray-100">
                  <Link to="/subjects">Get Started Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

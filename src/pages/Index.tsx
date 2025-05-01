
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
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
                  <Link to="/courses">Explore Courses</Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-wave-pattern bg-repeat-x bg-contain"></div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;


import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Video, FileText, Award, Clock } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Courses = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Course Highlights */}
        <section className="py-12 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <div className="container px-4 mx-auto sm:px-6">
            <h1 className="text-3xl font-bold text-center mb-12">Course Highlights</h1>
            
            <div className="space-y-8 max-w-3xl mx-auto">
              {/* 2 Live Classes/day */}
              <div className="bg-indigo-600/40 p-8 rounded-xl backdrop-blur-sm">
                <div className="flex items-start">
                  <div className="p-2 mr-4">
                    <Video className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">2 Live Classes/day</h3>
                    <p className="text-indigo-100">Interactive live classes with real-time doubt resolution</p>
                  </div>
                </div>
              </div>
              
              {/* Comprehensive Notes */}
              <div className="bg-indigo-600/40 p-8 rounded-xl backdrop-blur-sm">
                <div className="flex items-start">
                  <div className="p-2 mr-4">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Comprehensive Notes</h3>
                    <p className="text-indigo-100">Detailed notes for all subjects and chapters</p>
                  </div>
                </div>
              </div>
              
              {/* Regular Tests */}
              <div className="bg-indigo-600/40 p-8 rounded-xl backdrop-blur-sm">
                <div className="flex items-start">
                  <div className="p-2 mr-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Regular Tests</h3>
                    <p className="text-indigo-100">Practice tests and assessments to track progress</p>
                  </div>
                </div>
              </div>
              
              {/* 24/7 Access */}
              <div className="bg-indigo-600/40 p-8 rounded-xl backdrop-blur-sm">
                <div className="flex items-start">
                  <div className="p-2 mr-4">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">24/7 Access</h3>
                    <p className="text-indigo-100">Learn at your own pace, anytime, anywhere</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 hover:text-indigo-700 font-semibold text-lg px-12 py-6 rounded-full">
                <Link to="/subjects">Let's Study</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Courses;

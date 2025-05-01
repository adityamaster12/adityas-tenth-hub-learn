
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Home, FileText, Plus } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const courseFeatures = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Two Live Classes Daily",
    description: "Join interactive live sessions with expert teachers, twice a day at scheduled times."
  },
  {
    icon: <Plus className="w-6 h-6" />,
    title: "Daily Practice Problems",
    description: "Access new practice problems daily to strengthen your understanding and test your knowledge."
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Comprehensive PDF Notes & Tests",
    description: "Download detailed study materials and practice tests for effective exam preparation."
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Multiple Batch Access",
    description: "Enjoy free access to all batches including Udaan, Udaan 2.0, and more."
  }
];

const courseBatches = [
  {
    name: "Udaan Batch",
    timing: "Morning: 7:00 AM - 8:30 AM",
    focus: "Complete syllabus coverage with emphasis on fundamentals"
  },
  {
    name: "Udaan 2.0 Batch",
    timing: "Evening: 5:00 PM - 6:30 PM",
    focus: "Advanced concepts and problem-solving techniques"
  },
  {
    name: "Weekend Warrior Batch",
    timing: "Weekends: 10:00 AM - 1:00 PM",
    focus: "Intensive weekend sessions for working students"
  }
];

const Courses = () => {
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
              <span className="font-medium text-gray-900">Courses</span>
            </div>
          </div>
        </div>

        {/* Hero section */}
        <section className="py-12 bg-white">
          <div className="container px-4 mx-auto sm:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold">Our Course Features</h1>
              <p className="mt-4 text-xl text-gray-600">
                Everything you need to succeed in your Class 10th studies
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 bg-gray-50">
          <div className="container px-4 mx-auto sm:px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {courseFeatures.map((feature, index) => (
                <div key={index} className="flex p-6 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-5 text-white rounded-full bg-education-primary">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Available Batches */}
        <section className="py-12 bg-white">
          <div className="container px-4 mx-auto sm:px-6">
            <h2 className="text-3xl font-bold text-center">Available Batches</h2>
            <p className="mt-4 text-center text-gray-600">Access all batches with your subscription</p>

            <div className="grid grid-cols-1 gap-8 mt-10 md:grid-cols-3">
              {courseBatches.map((batch, index) => (
                <div key={index} className="overflow-hidden bg-white border rounded-lg shadow-sm">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-education-primary">{batch.name}</h3>
                    <p className="mt-2 text-gray-600">{batch.timing}</p>
                    <p className="mt-4 text-sm text-gray-600">Focus: {batch.focus}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Curriculum Overview */}
        <section className="py-12 bg-gray-50">
          <div className="container px-4 mx-auto sm:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold">Comprehensive Curriculum</h2>
              <p className="mt-4 text-gray-600">
                Our curriculum covers all subjects as per the latest CBSE, ICSE, and State Board syllabi for Class 10th.
              </p>
              <div className="mt-8">
                <Button asChild className="bg-education-primary hover:bg-education-primary/90">
                  <Link to="/subjects">View All Subjects</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Enrollment CTA */}
        <section className="py-16 bg-gradient-to-r from-education-primary to-education-secondary">
          <div className="container px-4 mx-auto text-center sm:px-6">
            <h2 className="text-3xl font-bold text-white">Ready to Begin Your Learning Journey?</h2>
            <p className="mt-4 text-lg text-white/90">
              Join thousands of students who have already benefited from our courses.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-white text-education-primary hover:bg-gray-100">
                <Link to="/subjects">Enroll Now</Link>
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

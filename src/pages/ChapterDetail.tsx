
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Home, Clock, Calendar } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getSubjectById, getChapterById, getDppLinks, getDppSolutionLinks } from '@/data/subjects';

const ChapterDetail = () => {
  const { subjectId, chapterId } = useParams<{ subjectId: string, chapterId: string }>();
  
  const subject = getSubjectById(subjectId || '');
  const chapter = subject ? getChapterById(subject, chapterId || '') : null;
  
  const [selectedLecture, setSelectedLecture] = useState<any>(
    chapter && chapter.lectures.length > 0 ? chapter.lectures[0] : null
  );

  if (!subject || !chapter) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Chapter not found</h1>
            <Link to="/subjects" className="mt-4 text-education-primary hover:underline">
              Back to Subjects
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const dppLinks = getDppLinks(chapter.id);
  const dppSolutionLinks = getDppSolutionLinks(chapter.id);

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
              <Link to={`/subject/${subject.id}`} className="text-gray-500 hover:text-gray-700">
                {subject.name}
              </Link>
              <span className="text-gray-500">/</span>
              <span className="font-medium text-gray-900">Chapter {chapter.number}</span>
            </div>
          </div>
        </div>

        {/* Chapter Header */}
        <section className={`py-6 ${subject.colorLight}`}>
          <div className="container px-4 mx-auto sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl font-bold">
                Chapter {chapter.number}: {chapter.title}
              </h1>
              <p className="mt-2 text-gray-600">{chapter.description}</p>
            </div>
          </div>
        </section>

        {/* Content Tabs */}
        <section className="py-6 bg-white">
          <div className="container px-4 mx-auto sm:px-6">
            <div className="max-w-4xl mx-auto">
              <Tabs defaultValue="lectures">
                <div className="border-b">
                  <TabsList className="h-10">
                    <TabsTrigger value="lectures" className="px-4">LECTURES</TabsTrigger>
                    <TabsTrigger value="notes" className="px-4">NOTES</TabsTrigger>
                    <TabsTrigger value="dpp-quiz" className="px-4">DPP QUIZ</TabsTrigger>
                    <TabsTrigger value="dpp-pdfs" className="px-4">DPP PDFs</TabsTrigger>
                    <TabsTrigger value="dpp-solutions" className="px-4">DPP SOLUTIONS</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="lectures" className="pt-6">
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Lecture List */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Lecture Videos</h3>
                      <div className="max-h-[600px] overflow-y-auto pr-2">
                        {chapter.lectures.map((lecture) => (
                          <div 
                            key={lecture.id}
                            className={`lecture-card cursor-pointer mb-4 p-2 rounded ${selectedLecture?.id === lecture.id ? 'border-2 border-education-primary' : 'border border-gray-200'}`}
                            onClick={() => setSelectedLecture(lecture)}
                          >
                            <div className="relative">
                              <img 
                                src={lecture.thumbnail} 
                                alt={lecture.title} 
                                className="object-cover w-full h-32 rounded"
                              />
                              <div className="absolute bottom-0 right-0 px-2 py-1 text-xs text-white bg-black bg-opacity-70 rounded-tl">
                                {lecture.duration}
                              </div>
                            </div>
                            <h4 className="mt-2 font-medium">{lecture.title}</h4>
                            <div className="flex items-center mt-2 text-sm text-gray-500">
                              <Calendar className="w-4 h-4 mr-1" />
                              <span>{lecture.date}</span>
                              <Clock className="w-4 h-4 ml-3 mr-1" />
                              <span>{lecture.duration}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Video Player */}
                    <div className="lg:col-span-2">
                      {selectedLecture ? (
                        <>
                          <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
                            <iframe 
                              src={selectedLecture.videoUrl} 
                              title={selectedLecture.title}
                              className="absolute top-0 left-0 w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                          <h2 className="mt-4 text-xl font-semibold">{selectedLecture.title}</h2>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{selectedLecture.date}</span>
                            <Clock className="w-4 h-4 ml-3 mr-1" />
                            <span>{selectedLecture.duration}</span>
                          </div>
                          <p className="mt-4 text-gray-700">{selectedLecture.description}</p>
                          <div className="mt-6">
                            <a 
                              href={selectedLecture.notesUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded bg-education-primary hover:bg-education-primary/90"
                            >
                              Download Lecture Notes
                            </a>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center justify-center h-64 border rounded-lg">
                          <p className="text-gray-500">Please select a lecture to view</p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="pt-6">
                  <div className="p-6 border rounded-lg">
                    <h3 className="text-lg font-semibold">Chapter Notes</h3>
                    <p className="mt-2 text-gray-600">
                      Comprehensive notes for this chapter are available for download.
                    </p>
                    <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
                      {chapter.lectures.map((lecture, index) => (
                        <a 
                          key={index}
                          href={lecture.notesUrl} 
                          className="flex items-center p-4 border rounded-lg hover:bg-gray-50"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="p-2 mr-4 rounded-full bg-education-light">📝</div>
                          <div>
                            <h4 className="font-medium">Notes: {lecture.title}</h4>
                            <p className="text-sm text-gray-500">PDF Format</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="dpp-quiz" className="pt-6">
                  <div className="p-12 border rounded-lg text-center">
                    <h3 className="text-3xl font-bold text-gray-400 mb-4">COMING SOON</h3>
                    <p className="text-xl text-gray-500">
                      Interactive quizzes for daily practice problems will be available soon.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="dpp-pdfs" className="pt-6">
                  <div className="p-6 border rounded-lg">
                    <h3 className="text-lg font-semibold">Daily Practice Problems - PDFs</h3>
                    <p className="mt-2 text-gray-600">
                      Download daily practice problems to solve offline.
                    </p>
                    <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
                      {dppLinks.map((dpp, index) => (
                        <a 
                          key={index}
                          href={dpp.url} 
                          className="flex items-center p-4 border rounded-lg hover:bg-gray-50"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="p-2 mr-4 rounded-full bg-education-light">📝</div>
                          <div>
                            <h4 className="font-medium">{dpp.title}</h4>
                            <p className="text-sm text-gray-500">Daily Practice Problems</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="dpp-solutions" className="pt-6">
                  <div className="p-6 border rounded-lg">
                    <h3 className="text-lg font-semibold">Daily Practice Problems - Solutions</h3>
                    <p className="mt-2 text-gray-600">
                      Check your answers with detailed solution guides.
                    </p>
                    <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
                      {dppSolutionLinks.map((solution, index) => (
                        <a 
                          key={index}
                          href={solution.url} 
                          className="flex items-center p-4 border rounded-lg hover:bg-gray-50"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="p-2 mr-4 rounded-full bg-education-light">✓</div>
                          <div>
                            <h4 className="font-medium">{solution.title}</h4>
                            <p className="text-sm text-gray-500">With Step-by-Step Explanations</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ChapterDetail;

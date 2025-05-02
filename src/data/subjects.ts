// Sample subjects and chapters data for educational website
// IMPORTANT: Replace dummy video links with actual Google Drive embed URLs
// IMPORTANT: Replace dummy notes links with actual Google Drive document links

// Types
export interface Lecture {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  date: string;
  duration: string;
  videoUrl: string; // Google Drive embed URL (replace with actual URLs)
  notesUrl: string; // Google Drive link (replace with actual URLs)
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  description: string;
  lectures: Lecture[];
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  color: string;
  colorLight: string;
  icon: string;
  chapters: Chapter[];
}

// Create unique video URLs for each lecture
const getVideoUrlForSubjectChapterLecture = (subjectId: string, chapterNumber: number, lectureNumber: number): string => {
  // This function would return unique video URLs for each lecture
  // Replace this with your actual Google Drive file IDs
  const videoUrlMap: Record<string, Record<number, Record<number, string>>> = {
    "physics": {
      1: {
        1: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv", // Physics Ch1 Lecture1
        2: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv", // Physics Ch1 Lecture2
        3: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv", // etc...
      },
      2: {
        1: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv",
        2: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv",
        3: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv",
      },
      // Add more chapters as needed
    },
    "chemistry": {
      1: {
        1: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv", // Chemistry Ch1 Lecture1
        2: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv", // etc...
      },
      // Add more chapters as needed
    },
    // Add more subjects as needed
  };

  // Try to get the specific video ID, fallback to default if not found
  const fileId = videoUrlMap[subjectId]?.[chapterNumber]?.[lectureNumber] || "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv";
  return `https://drive.google.com/file/d/${fileId}/preview`;
};

// Create unique notes URLs for each lecture
const getNotesUrlForSubjectChapterLecture = (subjectId: string, chapterNumber: number, lectureNumber: number): string => {
  // This function would return unique notes URLs for each lecture
  // Replace this with your actual Google Drive file IDs
  const notesUrlMap: Record<string, Record<number, Record<number, string>>> = {
    "physics": {
      1: {
        1: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv", // Physics Ch1 Lecture1 Notes
        2: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv", // Physics Ch1 Lecture2 Notes
        3: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv", // etc...
      },
      2: {
        1: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv",
        2: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv",
        3: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv",
      },
      // Add more chapters as needed
    },
    "chemistry": {
      1: {
        1: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv", // Chemistry Ch1 Lecture1 Notes
        2: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv", // etc...
      },
      // Add more chapters as needed
    },
    // Add more subjects as needed
  };

  // Try to get the specific notes ID, fallback to default if not found
  const fileId = notesUrlMap[subjectId]?.[chapterNumber]?.[lectureNumber] || "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv";
  return `https://drive.google.com/file/d/${fileId}/view`;
};

// Helper function to create lectures with individualized links
const createLectures = (chapterPrefix: string, count: number = 7): Lecture[] => {
  // Extract subject and chapter info from prefix
  const parts = chapterPrefix.split('-');
  const subjectId = parts[0];
  const chapterNumber = parseInt(parts[2]);

  return Array.from({ length: count }, (_, i) => {
    const lectureNumber = i + 1;
    return {
      id: `${chapterPrefix}-lecture-${lectureNumber}`,
      title: `Lecture ${lectureNumber}: ${generateLectureTitle(lectureNumber)}`,
      description: `This lecture covers important concepts and examples related to ${generateLectureTitle(lectureNumber)}.`,
      thumbnail: `https://picsum.photos/seed/${chapterPrefix}-${lectureNumber}/400/225`,
      date: generateRandomDate(),
      duration: generateRandomDuration(),
      // Use our helper functions to get unique URLs for each lecture
      videoUrl: getVideoUrlForSubjectChapterLecture(subjectId, chapterNumber, lectureNumber),
      notesUrl: getNotesUrlForSubjectChapterLecture(subjectId, chapterNumber, lectureNumber),
    };
  });
};

// Create individualized DPP links
const getDppLinksForSubjectChapter = (subjectId: string, chapterNumber: number): Record<number, string> => {
  // Replace with your actual Google Drive file IDs
  const dppMap: Record<string, Record<number, Record<number, string>>> = {
    "physics": {
      1: {
        1: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv", // Physics Ch1 DPP1
        2: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv", // Physics Ch1 DPP2
        3: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv", // etc...
        4: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv",
        5: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv",
      },
      2: {
        1: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv",
        2: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv",
        3: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv",
        4: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv",
        5: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv",
      },
      // Add more chapters as needed
    },
    "chemistry": {
      1: {
        1: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv",
        2: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv",
        3: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv",
        4: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv",
        5: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv",
      },
      // Add more chapters as needed
    },
    // Add more subjects as needed
  };

  // Return the map for a specific subject and chapter, or empty object if not found
  return dppMap[subjectId]?.[chapterNumber] || {};
};

// Create individualized DPP solution links
const getDppSolutionLinksForSubjectChapter = (subjectId: string, chapterNumber: number): Record<number, string> => {
  // Replace with your actual Google Drive file IDs
  const dppSolutionMap: Record<string, Record<number, Record<number, string>>> = {
    "physics": {
      1: {
        1: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv", // Physics Ch1 DPP1 Solution
        2: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv", // Physics Ch1 DPP2 Solution
        3: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv", // etc...
        4: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv",
        5: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv",
      },
      2: {
        1: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv",
        2: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv",
        3: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv",
        4: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv",
        5: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv",
      },
      // Add more chapters as needed
    },
    "chemistry": {
      1: {
        1: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv",
        2: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv",
        3: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv",
        4: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv",
        5: "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv",
      },
      // Add more chapters as needed
    },
    // Add more subjects as needed
  };

  // Return the map for a specific subject and chapter, or empty object if not found
  return dppSolutionMap[subjectId]?.[chapterNumber] || {};
};

// Helper function to generate a lecture title
function generateLectureTitle(lectureNumber: number): string {
  const titles = [
    "Introduction to Key Concepts",
    "Basic Principles and Fundamentals",
    "Problem-Solving Techniques",
    "Advanced Applications",
    "Practical Examples",
    "Important Formulas and Equations",
    "Numerical Problems",
    "Theory and Practice",
    "Common Misconceptions",
    "Exam Preparation Strategies"
  ];
  
  return titles[lectureNumber % titles.length];
}

// Helper function to generate a random date in the last 3 months
function generateRandomDate(): string {
  const today = new Date();
  const pastDate = new Date(today);
  pastDate.setDate(today.getDate() - Math.floor(Math.random() * 90));
  
  return pastDate.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

// Helper function to generate a random video duration
function generateRandomDuration(): string {
  const minutes = Math.floor(Math.random() * 30) + 20; // 20-50 minutes
  const seconds = Math.floor(Math.random() * 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Helper function to generate actual CBSE class 10th chapter titles based on subject
function generateChapterTitle(subjectId: string, chapterNumber: number): string {
  const chapterTitles: { [key: string]: string[] } = {
    "physics": [
      "Electric Current and Circuit",
      "Magnetic Effects of Electric Current",
      "Sources of Energy",
      "Light - Reflection and Refraction",
      "The Human Eye and the Colorful World",
    ],
    "chemistry": [
      "Chemical Reactions and Equations",
      "Acids, Bases and Salts",
      "Metals and Non-metals",
      "Carbon and its Compounds",
      "Periodic Classification of Elements",
    ],
    "biology": [
      "Life Processes",
      "Control and Coordination",
      "How do Organisms Reproduce?",
      "Heredity and Evolution",
      "Our Environment",
    ],
    "mathematics": [
      "Real Numbers",
      "Polynomials",
      "Pair of Linear Equations in Two Variables",
      "Quadratic Equations",
      "Arithmetic Progressions",
      "Triangles",
      "Coordinate Geometry",
      "Introduction to Trigonometry",
      "Circles",
      "Areas Related to Circles",
      "Surface Areas and Volumes",
      "Statistics",
      "Probability",
    ],
    "sst": [
      "The Rise of Nationalism in Europe",
      "Nationalism in India",
      "The Making of a Global World",
      "The Age of Industrialization",
      "Print Culture and the Modern World",
      "Resources and Development",
      "Forest and Wildlife Resources",
      "Water Resources",
      "Agriculture",
      "Minerals and Energy Resources",
      "Manufacturing Industries",
      "Lifelines of National Economy",
      "Power Sharing",
      "Federalism",
      "Democracy and Diversity",
      "Gender, Religion and Caste",
      "Popular Struggles and Movements",
      "Political Parties",
      "Outcomes of Democracy",
      "Challenges to Democracy",
      "Development",
      "Sectors of the Indian Economy",
      "Money and Credit",
      "Globalisation and the Indian Economy",
      "Consumer Rights",
    ],
    "english": [
      "A Letter to God",
      "Nelson Mandela: Long Walk to Freedom",
      "Two Stories About Flying",
      "From the Diary of Anne Frank",
      "The Hundred Dresses I & II",
      "Glimpses of India",
      "Mijbil the Otter",
      "Madam Rides the Bus",
      "The Sermon at Benares",
      "The Proposal",
    ],
    "hindi-a": [
      "सूरदास के पद",
      "राम-लक्ष्मण-परशुराम संवाद",
      "देव",
      "जयशंकर प्रसाद",
      "सूरदास",
      "नेताजी का चश्मा",
      "बालगोबिन भगत",
      "लखनवी अंदाज",
      "मानवीय करुणा की दिव्य चमक",
      "एक कहानी यह भी",
    ],
    "hindi-b": [
      "बड़े भाई साहब",
      "डायरी का एक पन्ना",
      "तताँरा वामीरो कथा",
      "तीसरी कसम के शिल्पकार शैलेंद्र",
      "गिरगिट",
      "अब कहां दूसरे के दुख से दुखी होने वाले",
      "पतझर में टूटी पत्तियां",
      "कारतूस",
      "हरिहर काका",
      "सपनों के-से दिन",
    ]
  };
  
  if (chapterTitles[subjectId] && chapterNumber <= chapterTitles[subjectId].length) {
    return chapterTitles[subjectId][chapterNumber - 1];
  }
  
  return `Chapter ${chapterNumber}`;
}

// Create all subjects with their chapters
export const subjects: Subject[] = [
  {
    id: "physics",
    name: "Physics",
    description: "Study of matter, energy, and the interaction between them",
    color: "bg-education-physics",
    colorLight: "bg-purple-50",
    icon: "⚛️",
    chapters: createChapters("physics", 5)
  },
  {
    id: "chemistry",
    name: "Chemistry",
    description: "Study of composition, structure, properties, and change of matter",
    color: "bg-education-chemistry",
    colorLight: "bg-green-50",
    icon: "🧪",
    chapters: createChapters("chemistry", 5)
  },
  {
    id: "biology",
    name: "Biology",
    description: "Study of living organisms and their interactions",
    color: "bg-education-biology",
    colorLight: "bg-cyan-50",
    icon: "🧬",
    chapters: createChapters("biology", 5)
  },
  {
    id: "mathematics",
    name: "Mathematics",
    description: "Study of numbers, quantity, structure, space, and change",
    color: "bg-education-mathematics",
    colorLight: "bg-red-50",
    icon: "➗",
    chapters: createChapters("mathematics", 13)
  },
  {
    id: "sst",
    name: "Social Studies",
    description: "Study of society, relationships among individuals, and history",
    color: "bg-education-sst",
    colorLight: "bg-orange-50",
    icon: "🌍",
    chapters: createChapters("sst", 25)
  },
  {
    id: "english",
    name: "English",
    description: "Study of language, literature, and composition",
    color: "bg-education-english",
    colorLight: "bg-blue-50",
    icon: "📚",
    chapters: createChapters("english", 10)
  },
  {
    id: "hindi-a",
    name: "Hindi Course A",
    description: "Study of Hindi language, literature, and composition (Course A)",
    color: "bg-education-hindi",
    colorLight: "bg-purple-50",
    icon: "🗣️",
    chapters: createChapters("hindi-a", 10)
  },
  {
    id: "hindi-b",
    name: "Hindi Course B",
    description: "Study of Hindi language, literature, and composition (Course B)",
    color: "bg-education-hindi",
    colorLight: "bg-purple-50",
    icon: "📝",
    chapters: createChapters("hindi-b", 10)
  }
];

// Helper functions to get subjects and chapters
export function getSubjectById(subjectId: string): Subject | undefined {
  return subjects.find(subject => subject.id === subjectId);
}

export function getChapterById(subject: Subject, chapterId: string): Chapter | undefined {
  return subject.chapters.find(chapter => chapter.id === chapterId);
}

// Updated DPP links function to use subject and chapter IDs
export function getDppLinks(chapterId: string, count: number = 5): { title: string, url: string }[] {
  // Extract subject ID and chapter number from chapter ID
  const parts = chapterId.split('-');
  const subjectId = parts[0];
  const chapterNumber = parseInt(parts[2]);
  
  // Get the specific DPP links for this subject and chapter
  const dppLinks = getDppLinksForSubjectChapter(subjectId, chapterNumber);
  
  return Array.from({ length: count }, (_, i) => {
    const dppNumber = i + 1;
    // Use specific DPP link if available, otherwise use default
    const fileId = dppLinks[dppNumber] || "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv";
    
    return {
      title: `DPP Set ${dppNumber}`,
      url: `https://drive.google.com/file/d/${fileId}/view`
    };
  });
}

// Updated DPP solution links function to use subject and chapter IDs
export function getDppSolutionLinks(chapterId: string, count: number = 5): { title: string, url: string }[] {
  // Extract subject ID and chapter number from chapter ID
  const parts = chapterId.split('-');
  const subjectId = parts[0];
  const chapterNumber = parseInt(parts[2]);
  
  // Get the specific DPP solution links for this subject and chapter
  const dppSolutionLinks = getDppSolutionLinksForSubjectChapter(subjectId, chapterNumber);
  
  return Array.from({ length: count }, (_, i) => {
    const dppNumber = i + 1;
    // Use specific DPP solution link if available, otherwise use default
    const fileId = dppSolutionLinks[dppNumber] || "1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv";
    
    return {
      title: `Solutions - DPP Set ${dppNumber}`,
      url: `https://drive.google.com/file/d/${fileId}/view`
    };
  });
}

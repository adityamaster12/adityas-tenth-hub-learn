
// Sample subjects and chapters data for educational website
// IMPORTANT: Replace dummy video links with actual YouTube embed URLs
// IMPORTANT: Replace dummy notes links with actual Google Drive or other document links

// Types
export interface Lecture {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  date: string;
  duration: string;
  videoUrl: string; // YouTube embed URL (replace with actual URLs)
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

// Helper function to create dummy lectures
const createLectures = (chapterPrefix: string, count: number = 5): Lecture[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${chapterPrefix}-lecture-${i + 1}`,
    title: `Lecture ${i + 1}: ${generateLectureTitle(i + 1)}`,
    description: `This lecture covers important concepts and examples related to ${generateLectureTitle(i + 1)}.`,
    // Use a placeholder image service for thumbnails
    thumbnail: `https://picsum.photos/seed/${chapterPrefix}-${i + 1}/400/225`,
    date: generateRandomDate(),
    duration: generateRandomDuration(),
    // IMPORTANT: Replace with actual YouTube embed URLs
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    // IMPORTANT: Replace with actual Google Drive URLs
    notesUrl: "https://drive.google.com/file/d/sample-file-id/view",
  }));
};

// Helper function to create chapters for a subject
const createChapters = (subjectId: string, count: number = 10): Chapter[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${subjectId}-chapter-${i + 1}`,
    number: i + 1,
    title: generateChapterTitle(subjectId, i + 1),
    description: `This chapter covers fundamental concepts of ${generateChapterTitle(subjectId, i + 1)}.`,
    lectures: createLectures(`${subjectId}-chapter-${i + 1}`),
  }));
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

// Helper function to generate chapter titles based on subject
function generateChapterTitle(subjectId: string, chapterNumber: number): string {
  const chapterTitles: { [key: string]: string[] } = {
    "physics": [
      "Physical World and Measurement",
      "Kinematics",
      "Laws of Motion",
      "Work, Energy and Power",
      "Motion of System of Particles",
      "Gravitation",
      "Properties of Bulk Matter",
      "Thermodynamics",
      "Behaviour of Perfect Gas",
      "Oscillations and Waves"
    ],
    "chemistry": [
      "Chemical Substances",
      "Structure of Atom",
      "Classification of Elements",
      "Chemical Bonding",
      "States of Matter",
      "Thermodynamics",
      "Equilibrium",
      "Redox Reactions",
      "Hydrogen and s-Block Elements",
      "Organic Chemistry"
    ],
    "biology": [
      "Life Processes",
      "Control and Coordination",
      "Reproduction in Organisms",
      "Heredity and Evolution",
      "Human Physiology",
      "Plants Physiology",
      "Ecology and Environment",
      "Diversity in Living Organisms",
      "Natural Resources",
      "Our Environment"
    ],
    "mathematics": [
      "Real Numbers",
      "Polynomials",
      "Pair of Linear Equations",
      "Quadratic Equations",
      "Arithmetic Progressions",
      "Triangles",
      "Coordinate Geometry",
      "Introduction to Trigonometry",
      "Circles",
      "Statistics and Probability"
    ],
    "sst": [
      "India and Contemporary World",
      "Contemporary India",
      "Democratic Politics",
      "Resources and Development",
      "Agriculture",
      "Manufacturing Industries",
      "Popular Struggles and Movements",
      "Challenges to Democracy",
      "Money and Credit",
      "Globalization"
    ],
    "english": [
      "Prose - First Flight",
      "Poetry - First Flight",
      "Supplementary Reader - Footprints",
      "Grammar and Vocabulary",
      "Reading Comprehension",
      "Letter Writing",
      "Article Writing",
      "Story Writing",
      "Editing and Omission",
      "Literature - Novel Study"
    ],
    "hindi-a": [
      "गद्य खंड",
      "काव्य खंड",
      "कृतिका (पूरक पाठ्य पुस्तक)",
      "व्याकरण",
      "निबंध लेखन",
      "पत्र लेखन",
      "विज्ञापन लेखन",
      "औपचारिक पत्र",
      "अपठित गद्यांश",
      "अपठित काव्यांश"
    ],
    "hindi-b": [
      "स्पर्श भाग-2",
      "संचयन भाग-2",
      "व्याकरण",
      "रचनात्मक लेखन",
      "पत्र लेखन",
      "विज्ञापन लेखन",
      "संवाद लेखन",
      "सूचना लेखन",
      "अनुच्छेद लेखन",
      "अपठित गद्यांश और काव्यांश"
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
    chapters: createChapters("physics")
  },
  {
    id: "chemistry",
    name: "Chemistry",
    description: "Study of composition, structure, properties, and change of matter",
    color: "bg-education-chemistry",
    colorLight: "bg-green-50",
    icon: "🧪",
    chapters: createChapters("chemistry")
  },
  {
    id: "biology",
    name: "Biology",
    description: "Study of living organisms and their interactions",
    color: "bg-education-biology",
    colorLight: "bg-cyan-50",
    icon: "🧬",
    chapters: createChapters("biology")
  },
  {
    id: "mathematics",
    name: "Mathematics",
    description: "Study of numbers, quantity, structure, space, and change",
    color: "bg-education-mathematics",
    colorLight: "bg-red-50",
    icon: "➗",
    chapters: createChapters("mathematics")
  },
  {
    id: "sst",
    name: "Social Studies",
    description: "Study of society, relationships among individuals, and history",
    color: "bg-education-sst",
    colorLight: "bg-orange-50",
    icon: "🌍",
    chapters: createChapters("sst")
  },
  {
    id: "english",
    name: "English",
    description: "Study of language, literature, and composition",
    color: "bg-education-english",
    colorLight: "bg-blue-50",
    icon: "📚",
    chapters: createChapters("english")
  },
  {
    id: "hindi-a",
    name: "Hindi Course A",
    description: "Study of Hindi language, literature, and composition (Course A)",
    color: "bg-education-hindi",
    colorLight: "bg-purple-50",
    icon: "🗣️",
    chapters: createChapters("hindi-a")
  },
  {
    id: "hindi-b",
    name: "Hindi Course B",
    description: "Study of Hindi language, literature, and composition (Course B)",
    color: "bg-education-hindi",
    colorLight: "bg-purple-50",
    icon: "📝",
    chapters: createChapters("hindi-b")
  }
];

// Helper functions to get subjects and chapters
export function getSubjectById(subjectId: string): Subject | undefined {
  return subjects.find(subject => subject.id === subjectId);
}

export function getChapterById(subject: Subject, chapterId: string): Chapter | undefined {
  return subject.chapters.find(chapter => chapter.id === chapterId);
}

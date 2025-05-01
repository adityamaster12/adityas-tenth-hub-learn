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

// Helper function to create dummy lectures
const createLectures = (chapterPrefix: string, count: number = 7): Lecture[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${chapterPrefix}-lecture-${i + 1}`,
    title: `Lecture ${i + 1}: ${generateLectureTitle(i + 1)}`,
    description: `This lecture covers important concepts and examples related to ${generateLectureTitle(i + 1)}.`,
    // Use a placeholder image service for thumbnails
    thumbnail: `https://picsum.photos/seed/${chapterPrefix}-${i + 1}/400/225`,
    date: generateRandomDate(),
    duration: generateRandomDuration(),
    // IMPORTANT: Replace with actual Google Drive embed URLs
    // Format: https://drive.google.com/file/d/YOUR_FILE_ID/preview
    videoUrl: "https://drive.google.com/file/d/1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv/preview",
    // IMPORTANT: Replace with actual Google Drive URLs
    // Format: https://drive.google.com/file/d/YOUR_FILE_ID/view
    notesUrl: "https://drive.google.com/file/d/1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
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

// Helper function for generating DPP links
export function getDppLinks(chapterId: string, count: number = 5): { title: string, url: string }[] {
  return Array.from({ length: count }, (_, i) => ({
    title: `DPP Set ${i + 1}`,
    // IMPORTANT: Replace with actual Google Drive URLs 
    // Format: https://drive.google.com/file/d/YOUR_FILE_ID/view
    url: "https://drive.google.com/file/d/1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv/view"
  }));
}

// Helper function for generating DPP solution links
export function getDppSolutionLinks(chapterId: string, count: number = 5): { title: string, url: string }[] {
  return Array.from({ length: count }, (_, i) => ({
    title: `Solutions - DPP Set ${i + 1}`,
    // IMPORTANT: Replace with actual Google Drive URLs
    // Format: https://drive.google.com/file/d/YOUR_FILE_ID/view
    url: "https://drive.google.com/file/d/1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv/view"
  }));
}

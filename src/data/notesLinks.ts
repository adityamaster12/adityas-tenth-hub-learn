
/**
 * NOTES LINKS
 * 
 * This file contains all lecture notes links organized by subject and chapter.
 * 
 * FORMAT:
 * "subjectID-chapter-X-lecture-Y": "https://drive.google.com/file/d/XXXXXXXX/view"
 * 
 * EXAMPLE:
 * "physics-chapter-1-lecture-1": "https://drive.google.com/file/d/abc123xyz/view"
 * 
 * TO UPDATE: Simply replace the Google Drive URL in quotes with your new URL
 */

export const notesLinks: Record<string, string> = {
  // PHYSICS NOTES
  // Chapter 1
  "physics-chapter-1-lecture-1": "https://drive.google.com/file/d/1abc123def456/view",
  "physics-chapter-1-lecture-2": "https://drive.google.com/file/d/1abc123def457/view",
  "physics-chapter-1-lecture-3": "https://drive.google.com/file/d/1abc123def458/view",
  "physics-chapter-1-lecture-4": "https://drive.google.com/file/d/1abc123def459/view",
  "physics-chapter-1-lecture-5": "https://drive.google.com/file/d/1abc123def460/view",
  "physics-chapter-1-lecture-6": "https://drive.google.com/file/d/1abc123def461/view",
  "physics-chapter-1-lecture-7": "https://drive.google.com/file/d/1abc123def462/view",
  "physics-chapter-1-lecture-8": "https://drive.google.com/file/d/1abc123def463/view",
  
  // Chapter 2
  "physics-chapter-2-lecture-1": "https://drive.google.com/file/d/1abc123def464/view",
  "physics-chapter-2-lecture-2": "https://drive.google.com/file/d/1abc123def465/view",
  "physics-chapter-2-lecture-3": "https://drive.google.com/file/d/1abc123def466/view",
  "physics-chapter-2-lecture-4": "https://drive.google.com/file/d/1abc123def467/view",
  "physics-chapter-2-lecture-5": "https://drive.google.com/file/d/1abc123def468/view",
  "physics-chapter-2-lecture-6": "https://drive.google.com/file/d/1abc123def469/view",
  "physics-chapter-2-lecture-7": "https://drive.google.com/file/d/1abc123def470/view",
  "physics-chapter-2-lecture-8": "https://drive.google.com/file/d/1abc123def471/view",
  
  // Continue for other physics chapters...
  
  // CHEMISTRY NOTES
  // Chapter 1
  "chemistry-chapter-1-lecture-1": "https://drive.google.com/file/d/2abc123def456/view",
  "chemistry-chapter-1-lecture-2": "https://drive.google.com/file/d/2abc123def457/view",
  "chemistry-chapter-1-lecture-3": "https://drive.google.com/file/d/2abc123def458/view",
  "chemistry-chapter-1-lecture-4": "https://drive.google.com/file/d/2abc123def459/view",
  "chemistry-chapter-1-lecture-5": "https://drive.google.com/file/d/2abc123def460/view",
  "chemistry-chapter-1-lecture-6": "https://drive.google.com/file/d/2abc123def461/view",
  "chemistry-chapter-1-lecture-7": "https://drive.google.com/file/d/2abc123def462/view",
  "chemistry-chapter-1-lecture-8": "https://drive.google.com/file/d/2abc123def463/view",
  
  // Continue for other chemistry chapters...
  
  // BIOLOGY NOTES
  "biology-chapter-1-lecture-1": "https://drive.google.com/file/d/3abc123def456/view",
  // Continue for all biology lectures...
  
  // MATHEMATICS NOTES
  "mathematics-chapter-1-lecture-1": "https://drive.google.com/file/d/4abc123def456/view",
  // Continue for all mathematics lectures...
  
  // SOCIAL STUDIES NOTES
  "sst-chapter-1-lecture-1": "https://drive.google.com/file/d/5abc123def456/view",
  // Continue for all SST lectures...
  
  // ENGLISH NOTES
  "english-chapter-1-lecture-1": "https://drive.google.com/file/d/6abc123def456/view",
  // Continue for all English lectures...
  
  // HINDI A NOTES
  "hindi-a-chapter-1-lecture-1": "https://drive.google.com/file/d/7abc123def456/view",
  // Continue for all Hindi A lectures...
  
  // HINDI B NOTES
  "hindi-b-chapter-1-lecture-1": "https://drive.google.com/file/d/8abc123def456/view"
  // Continue for all Hindi B lectures...
};

/**
 * Function to get a lecture notes URL
 * @param lectureId Format: "subject-chapter-X-lecture-Y" (e.g., "physics-chapter-1-lecture-2")
 * @returns The Google Drive URL for the requested lecture notes
 */
export function getNotesUrl(lectureId: string): string {
  return notesLinks[lectureId] || "https://drive.google.com/file/d/default_notes_id/view"; // Default fallback
}

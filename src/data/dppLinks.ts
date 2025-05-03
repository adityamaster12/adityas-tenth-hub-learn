
/**
 * DPP (DAILY PRACTICE PROBLEMS) LINKS
 * 
 * This file contains all DPP links organized by subject and chapter.
 * 
 * FORMAT:
 * "subjectID-chapter-X-dpp-Y": "https://drive.google.com/file/d/XXXXXXXX/view"
 * 
 * EXAMPLE:
 * "physics-chapter-1-dpp-1": "https://drive.google.com/file/d/abc123xyz/view"
 * 
 * TO UPDATE: Simply replace the Google Drive URL in quotes with your new URL
 */

export const dppLinks: Record<string, string> = {
  // PHYSICS DPPs
  // Chapter 1
  "physics-chapter-1-dpp-1": "https://drive.google.com/file/d/1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  "physics-chapter-1-dpp-2": "https://drive.google.com/file/d/1yCQFG2t3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  "physics-chapter-1-dpp-3": "https://drive.google.com/file/d/1yCQFG3t3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  "physics-chapter-1-dpp-4": "https://drive.google.com/file/d/1yCQFG4t3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  "physics-chapter-1-dpp-5": "https://drive.google.com/file/d/1yCQFG5t3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  
  // Chapter 2
  "physics-chapter-2-dpp-1": "https://drive.google.com/file/d/1yCQFH1t3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  "physics-chapter-2-dpp-2": "https://drive.google.com/file/d/1yCQFH2t3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  "physics-chapter-2-dpp-3": "https://drive.google.com/file/d/1yCQFH3t3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  "physics-chapter-2-dpp-4": "https://drive.google.com/file/d/1yCQFH4t3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  "physics-chapter-2-dpp-5": "https://drive.google.com/file/d/1yCQFH5t3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  
  // Continue for other physics chapters...
  
  // CHEMISTRY DPPs
  // Chapter 1
  "chemistry-chapter-1-dpp-1": "https://drive.google.com/file/d/2yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  "chemistry-chapter-1-dpp-2": "https://drive.google.com/file/d/2yCQFG2t3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  "chemistry-chapter-1-dpp-3": "https://drive.google.com/file/d/2yCQFG3t3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  "chemistry-chapter-1-dpp-4": "https://drive.google.com/file/d/2yCQFG4t3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  "chemistry-chapter-1-dpp-5": "https://drive.google.com/file/d/2yCQFG5t3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  
  // Continue for other chemistry chapters...
  
  // BIOLOGY DPPs
  "biology-chapter-1-dpp-1": "https://drive.google.com/file/d/3yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  // Continue for all biology chapters...
  
  // MATHEMATICS DPPs
  "mathematics-chapter-1-dpp-1": "https://drive.google.com/file/d/4yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  // Continue for all mathematics chapters...
  
  // SOCIAL STUDIES DPPs
  "sst-chapter-1-dpp-1": "https://drive.google.com/file/d/5yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  // Continue for all SST chapters...
  
  // ENGLISH DPPs
  "english-chapter-1-dpp-1": "https://drive.google.com/file/d/6yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  // Continue for all English chapters...
  
  // HINDI A DPPs
  "hindi-a-chapter-1-dpp-1": "https://drive.google.com/file/d/7yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  // Continue for all Hindi A chapters...
  
  // HINDI B DPPs
  "hindi-b-chapter-1-dpp-1": "https://drive.google.com/file/d/8yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv/view"
  // Continue for all Hindi B chapters...
};

/**
 * Function to get DPP links for a chapter
 * @param chapterId Format: "subject-chapter-X" (e.g., "physics-chapter-1")
 * @param count Number of DPPs to return
 * @returns Array of DPP links with titles
 */
export function getDppLinks(chapterId: string, count: number = 5): { title: string, url: string }[] {
  return Array.from({ length: count }, (_, i) => {
    const dppNumber = i + 1;
    const dppId = `${chapterId}-dpp-${dppNumber}`;
    
    return {
      title: `DPP Set ${dppNumber}`,
      url: dppLinks[dppId] || "https://drive.google.com/file/d/default_dpp_id/view" // Default fallback
    };
  });
}

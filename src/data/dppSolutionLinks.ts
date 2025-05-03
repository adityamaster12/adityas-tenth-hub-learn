
/**
 * DPP SOLUTION LINKS
 * 
 * This file contains all DPP solution links organized by subject and chapter.
 * 
 * FORMAT:
 * "subjectID-chapter-X-dpp-solution-Y": "https://drive.google.com/file/d/XXXXXXXX/view"
 * 
 * EXAMPLE:
 * "physics-chapter-1-dpp-solution-1": "https://drive.google.com/file/d/abc123xyz/view"
 * 
 * TO UPDATE: Simply replace the Google Drive URL in quotes with your new URL
 */

export const dppSolutionLinks: Record<string, string> = {
  // PHYSICS DPP SOLUTIONS
  // Chapter 1
  "physics-chapter-1-dpp-solution-1": "https://drive.google.com/file/d/1yCQFG1s3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  "physics-chapter-1-dpp-solution-2": "https://drive.google.com/file/d/1yCQFG2s3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  "physics-chapter-1-dpp-solution-3": "https://drive.google.com/file/d/1yCQFG3s3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  "physics-chapter-1-dpp-solution-4": "https://drive.google.com/file/d/1yCQFG4s3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  "physics-chapter-1-dpp-solution-5": "https://drive.google.com/file/d/1yCQFG5s3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  
  // Chapter 2
  "physics-chapter-2-dpp-solution-1": "https://drive.google.com/file/d/1yCQFH1s3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  "physics-chapter-2-dpp-solution-2": "https://drive.google.com/file/d/1yCQFH2s3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  "physics-chapter-2-dpp-solution-3": "https://drive.google.com/file/d/1yCQFH3s3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  "physics-chapter-2-dpp-solution-4": "https://drive.google.com/file/d/1yCQFH4s3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  "physics-chapter-2-dpp-solution-5": "https://drive.google.com/file/d/1yCQFH5s3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  
  // Continue for other physics chapters...
  
  // CHEMISTRY DPP SOLUTIONS
  // Chapter 1
  "chemistry-chapter-1-dpp-solution-1": "https://drive.google.com/file/d/2yCQFG1s3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  "chemistry-chapter-1-dpp-solution-2": "https://drive.google.com/file/d/2yCQFG2s3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  "chemistry-chapter-1-dpp-solution-3": "https://drive.google.com/file/d/2yCQFG3s3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  "chemistry-chapter-1-dpp-solution-4": "https://drive.google.com/file/d/2yCQFG4s3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  "chemistry-chapter-1-dpp-solution-5": "https://drive.google.com/file/d/2yCQFG5s3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  
  // Continue for other chemistry chapters...
  
  // BIOLOGY DPP SOLUTIONS
  "biology-chapter-1-dpp-solution-1": "https://drive.google.com/file/d/3yCQFG1s3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  // Continue for all biology chapters...
  
  // MATHEMATICS DPP SOLUTIONS
  "mathematics-chapter-1-dpp-solution-1": "https://drive.google.com/file/d/4yCQFG1s3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  // Continue for all mathematics chapters...
  
  // SOCIAL STUDIES DPP SOLUTIONS
  "sst-chapter-1-dpp-solution-1": "https://drive.google.com/file/d/5yCQFG1s3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  // Continue for all SST chapters...
  
  // ENGLISH DPP SOLUTIONS
  "english-chapter-1-dpp-solution-1": "https://drive.google.com/file/d/6yCQFG1s3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  // Continue for all English chapters...
  
  // HINDI A DPP SOLUTIONS
  "hindi-a-chapter-1-dpp-solution-1": "https://drive.google.com/file/d/7yCQFG1s3tNeYoGhDMHJWnCqR0XYR1Ekv/view",
  // Continue for all Hindi A chapters...
  
  // HINDI B DPP SOLUTIONS
  "hindi-b-chapter-1-dpp-solution-1": "https://drive.google.com/file/d/8yCQFG1s3tNeYoGhDMHJWnCqR0XYR1Ekv/view"
  // Continue for all Hindi B chapters...
};

/**
 * Function to get DPP solution links for a chapter
 * @param chapterId Format: "subject-chapter-X" (e.g., "physics-chapter-1")
 * @param count Number of DPP solutions to return
 * @returns Array of DPP solution links with titles
 */
export function getDppSolutionLinks(chapterId: string, count: number = 5): { title: string, url: string }[] {
  return Array.from({ length: count }, (_, i) => {
    const dppNumber = i + 1;
    const dppSolutionId = `${chapterId}-dpp-solution-${dppNumber}`;
    
    return {
      title: `Solutions - DPP Set ${dppNumber}`,
      url: dppSolutionLinks[dppSolutionId] || "https://drive.google.com/file/d/default_solution_id/view" // Default fallback
    };
  });
}

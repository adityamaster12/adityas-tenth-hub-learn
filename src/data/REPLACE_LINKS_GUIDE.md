# Guide for Replacing Dummy Links with Your Own Content

This guide will help you replace all dummy links in the educational website with your actual content links.

## Where to Replace Links

All links are defined in the `src/data/subjects.ts` file. There are three types of links to replace:

1. **Video Links**: Google Drive embed URLs for lecture videos
2. **Notes Links**: Google Drive links for downloadable PDF notes
3. **DPP Links**: Google Drive links for daily practice problems and solutions

## How to Replace Video Links (Google Drive)

1. In `src/data/subjects.ts`, find the `createLectures` function
2. Replace the dummy `videoUrl` with your actual Google Drive embed URL:

```javascript
// FROM:
videoUrl: "https://drive.google.com/file/d/1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv/preview",

// TO:
videoUrl: "https://drive.google.com/file/d/YOUR_GOOGLE_DRIVE_FILE_ID/preview",
```

**Note**: To correctly embed a Google Drive video:
1. Upload your video to Google Drive
2. Right-click on the file and select "Get link" or "Share"
3. Make sure the link is set to "Anyone with the link can view"
4. Copy the file ID from the link (it's the long string between `/d/` and `/view`)
5. Use this format: `https://drive.google.com/file/d/YOUR_FILE_ID/preview`

## How to Replace Notes Links

1. In `src/data/subjects.ts`, find the `createLectures` function
2. Replace the dummy `notesUrl` with your actual Google Drive link:

```javascript
// FROM:
notesUrl: "https://drive.google.com/file/d/1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv/view",

// TO:
notesUrl: "https://drive.google.com/file/d/YOUR_GOOGLE_DRIVE_FILE_ID/view",
```

## How to Replace DPP Links

1. In `src/data/subjects.ts`, find the `getDppLinks` and `getDppSolutionLinks` functions
2. Replace the dummy URLs with your actual Google Drive links:

```javascript
// FROM:
url: "https://drive.google.com/file/d/1yCQFG1t3tNeYoGhDMHJWnCqR0XYR1Ekv/view"

// TO:
url: "https://drive.google.com/file/d/YOUR_GOOGLE_DRIVE_FILE_ID/view"
```

## Advanced: Adding Different Links for Each Subject/Chapter

If you want to have different links for different subjects or chapters, you can modify the functions in `subjects.ts` to use the subject or chapter ID to determine which link to return.

Example modification:
```javascript
const createLectures = (chapterPrefix: string, count: number = 7): Lecture[] => {
  // Extract subject ID from chapterPrefix (e.g., "physics-chapter-1" -> "physics")
  const subjectId = chapterPrefix.split('-')[0];
  // Extract chapter number from chapterPrefix (e.g., "physics-chapter-1" -> 1)
  const chapterNumber = parseInt(chapterPrefix.split('-')[2]);
  
  return Array.from({ length: count }, (_, i) => ({
    // ... other properties
    
    // Use different video URLs based on subject and chapter
    videoUrl: getVideoUrlForSubjectAndChapter(subjectId, chapterNumber, i + 1),
    
    // Use different notes URLs based on subject and chapter
    notesUrl: getNotesUrlForSubjectAndChapter(subjectId, chapterNumber, i + 1),
  }));
};

// Helper function to return specific videos for each subject and chapter
function getVideoUrlForSubjectAndChapter(subjectId: string, chapterNumber: number, lectureNumber: number): string {
  // Define your actual Google Drive embed URLs for each subject, chapter, and lecture
  const videoUrls: Record<string, Record<number, string[]>> = {
    "physics": {
      1: [ // Chapter 1 videos
        "https://drive.google.com/file/d/YOUR_FILE_ID_1/preview",
        "https://drive.google.com/file/d/YOUR_FILE_ID_2/preview",
        // Add more URLs as needed
      ],
      2: [ // Chapter 2 videos
        "https://drive.google.com/file/d/YOUR_FILE_ID_3/preview",
        "https://drive.google.com/file/d/YOUR_FILE_ID_4/preview",
        // Add more URLs as needed
      ],
      // Add more chapters as needed
    },
    "chemistry": {
      // Similar structure for chemistry chapters
    },
    // Add more subjects as needed
  };
  
  // Return the specific URL if available, otherwise return a default URL
  return videoUrls[subjectId]?.[chapterNumber]?.[lectureNumber - 1] || 
    "https://drive.google.com/file/d/DEFAULT_FILE_ID/preview";
}

// Similar function for notes URLs
function getNotesUrlForSubjectAndChapter(subjectId: string, chapterNumber: number, lectureNumber: number): string {
  // Implementation similar to getVideoUrlForSubjectAndChapter
  // ...
}
```

## Important Notes About Google Drive Embedding

1. **File Permissions**: Ensure all your Google Drive files are set to "Anyone with the link can view"
2. **Embedding Format**: 
   - For videos: Use `/preview` at the end of the URL for proper embedding
   - For downloadable files (PDFs, etc.): Use `/view` at the end of the URL
3. **File IDs**: Only change the file ID part of the URL, keep the rest of the URL structure the same
4. **Testing**: After replacing links, test each section thoroughly to ensure all content loads correctly

# Guide for Replacing Dummy Links

This guide helps you replace all dummy links in the educational website with your actual content links.

## Where to Replace Links

All links are defined in the `src/data/subjects.ts` file. There are three types of links to replace:

1. **Video Links**: YouTube embed URLs for lecture videos
2. **Notes Links**: Google Drive links for downloadable PDF notes
3. **DPP Links**: Google Drive links for daily practice problems and solutions

## How to Replace Video Links

1. In `src/data/subjects.ts`, find the `createLectures` function
2. Replace the dummy `videoUrl` with your actual YouTube embed URL:

```javascript
// FROM:
videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",

// TO:
videoUrl: "https://www.youtube.com/embed/YOUR_YOUTUBE_VIDEO_ID",
```

**Note**: Make sure to use the embed URL format (`youtube.com/embed/VIDEO_ID`) and not the regular YouTube watch URL.

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
  
  return Array.from({ length: count }, (_, i) => ({
    // ... other properties
    
    // Use different video URLs based on subject
    videoUrl: getVideoUrlForSubject(subjectId, i + 1),
    
    // Use different notes URLs based on subject
    notesUrl: getNotesUrlForSubject(subjectId, i + 1),
  }));
};

// Helper function to return specific videos for each subject
function getVideoUrlForSubject(subjectId: string, lectureNumber: number): string {
  // Define your actual YouTube embed URLs for each subject and lecture
  const videoUrls: Record<string, string[]> = {
    "physics": [
      "https://www.youtube.com/embed/VIDEO_ID_1",
      "https://www.youtube.com/embed/VIDEO_ID_2",
      // Add more URLs as needed
    ],
    "chemistry": [
      "https://www.youtube.com/embed/VIDEO_ID_3",
      "https://www.youtube.com/embed/VIDEO_ID_4",
      // Add more URLs as needed
    ],
    // Add more subjects as needed
  };
  
  // Return the specific URL if available, otherwise return a default URL
  return videoUrls[subjectId]?.[lectureNumber - 1] || "https://www.youtube.com/embed/DEFAULT_VIDEO_ID";
}

// Similar function for notes URLs
function getNotesUrlForSubject(subjectId: string, lectureNumber: number): string {
  // Implementation similar to getVideoUrlForSubject
  // ...
}
```

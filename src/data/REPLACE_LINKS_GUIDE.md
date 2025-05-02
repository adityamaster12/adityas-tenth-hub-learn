
# Guide for Replacing Dummy Links with Your Own Content

This guide will help you replace all dummy links in the educational website with your actual content links.

## Where to Replace Links

All links are defined in the `src/data/subjects.ts` file. The structure has been updated to provide individualized links for:
- Each lecture in each chapter of each subject
- Daily practice problems (DPPs) for each chapter of each subject
- Solutions for DPPs for each chapter of each subject

## How to Replace Video Links

1. In `src/data/subjects.ts`, locate the `getVideoUrlForSubjectChapterLecture` function
2. Replace the dummy file IDs with your actual Google Drive file IDs:

```javascript
const videoUrlMap: Record<string, Record<number, Record<number, string>>> = {
  "physics": {
    1: {
      1: "YOUR_FILE_ID_FOR_PHYSICS_CH1_LECTURE1",
      2: "YOUR_FILE_ID_FOR_PHYSICS_CH1_LECTURE2",
      // Add more lectures as needed
    },
    2: {
      1: "YOUR_FILE_ID_FOR_PHYSICS_CH2_LECTURE1",
      // Add more lectures as needed
    },
  },
  "chemistry": {
    // Similar structure for chemistry
  },
  // Add more subjects as needed
};
```

**Note**: To correctly embed a Google Drive video:
1. Upload your video to Google Drive
2. Right-click on the file and select "Get link" or "Share"
3. Make sure the link is set to "Anyone with the link can view"
4. Copy the file ID from the link (it's the long string between `/d/` and `/view`)
5. Replace the dummy IDs in the code with your actual file IDs

## How to Replace Notes Links

Similarly, in the `getNotesUrlForSubjectChapterLecture` function, replace the dummy file IDs:

```javascript
const notesUrlMap: Record<string, Record<number, Record<number, string>>> = {
  "physics": {
    1: {
      1: "YOUR_FILE_ID_FOR_PHYSICS_CH1_LECTURE1_NOTES",
      2: "YOUR_FILE_ID_FOR_PHYSICS_CH1_LECTURE2_NOTES",
      // Add more as needed
    },
    // Add more chapters as needed
  },
  // Add more subjects as needed
};
```

## How to Replace DPP Links

For DPP links, update the `getDppLinksForSubjectChapter` function:

```javascript
const dppMap: Record<string, Record<number, Record<number, string>>> = {
  "physics": {
    1: {
      1: "YOUR_FILE_ID_FOR_PHYSICS_CH1_DPP1", 
      2: "YOUR_FILE_ID_FOR_PHYSICS_CH1_DPP2",
      // Add more as needed
    },
    // Add more chapters as needed
  },
  // Add more subjects as needed
};
```

And similarly for solutions, update the `getDppSolutionLinksForSubjectChapter` function.

## Structure of the Link Maps

The link map structure is:
```
{
  "subjectId": {
    chapterNumber: {
      lectureNumber: "fileId"
    }
  }
}
```

For example:
- `videoUrlMap["physics"][1][2]` refers to the video for Physics, Chapter 1, Lecture 2
- `notesUrlMap["chemistry"][3][1]` refers to the notes for Chemistry, Chapter 3, Lecture 1
- `dppMap["mathematics"][2][4]` refers to DPP set 4 for Mathematics, Chapter 2

## Adding Support for New Subjects, Chapters, or Lectures

If you need to add support for new subjects, chapters, or lectures:

1. Update the corresponding map in `subjects.ts`
2. Make sure all the required file IDs are provided
3. The system will automatically use these IDs to generate the correct links

## Important Notes About Google Drive Embedding

1. **File Permissions**: Ensure all your Google Drive files are set to "Anyone with the link can view"
2. **Embedding Format**: 
   - For videos: Use `/preview` at the end of the URL for proper embedding
   - For downloadable files (PDFs, etc.): Use `/view` at the end of the URL
3. **File IDs**: Only change the file ID part of the URL, keep the rest of the URL structure the same
4. **Testing**: After replacing links, test each section thoroughly to ensure all content loads correctly
5. **Default File ID**: If a specific file ID is not found in the maps, the system will use a default ID. Make sure to replace all default IDs as well.

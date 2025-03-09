const fs = require('fs');
const path = require('path');
const jsmediatags = require('jsmediatags');
const mongodb = require('mongoose');
// Folder where your MP3 files are stored
const folderPath = './songs'; // Modify this to your folder path

// Function to read metadata of all MP3 files in the folder
function getMetadataOfSongs(folderPath, callback) {
  const songsMetadata = [];
<<<<<<< HEAD
  
=======

>>>>>>> daf5e2767462f922d14c1645417f23a641f97ee0
  // Read all files in the folder
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.log("Error reading folder:", err);
      return;
    }

    // Filter out only MP3 files
    const mp3Files = files.filter(file => path.extname(file).toLowerCase() === '.mp3');

    // Iterate over each MP3 file
    let processedCount = 0; // Keep track of how many files have been processed

    mp3Files.forEach((file, index) => {
      const filePath = path.join(folderPath, file);

      // Read metadata for each MP3 file using jsmediatags
      jsmediatags.read(filePath, {
        onSuccess: function(tag) {
          const metadata = tag;

          // Push the metadata into the array
          songsMetadata.push(metadata);

          processedCount++;

          // Once all files are processed, invoke the callback
          if (processedCount === mp3Files.length) {
            callback(songsMetadata);
          }
        },
        onError: function(error) {
          console.log(`Error reading metadata of ${file}:`, error);
        }
      });
    });
  });
}

// Call the function to get metadata and print the result after all files are processed
getMetadataOfSongs(folderPath, (songsMetadata) => { 
    // insert every song into the database , if not present.
   console.log(songsMetadata);
});

module.exports =  {getMetadataOfSongs};

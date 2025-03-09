const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  title: String,
  artist: String,
  album: String,
  genre: String,
  year: String,
  gcsUrl: String, // Song file URL in GCS
});

SongSchema.index({ title: "text", artist: "text", album: "text", genre: "text" }); // Enable text search

const Song = mongoose.model("Song", SongSchema);
module.exports = Song;

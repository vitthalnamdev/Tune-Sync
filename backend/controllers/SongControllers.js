const Song = require("../models/Song");
const mongoose=require("mongoose");

exports.autoSuggetion =  async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: "Search query required" });
  
    try {
      const suggestions = await Song.find(
        { title: { $regex: query, $options: "i" } }, // Case-insensitive match
        { title: 1, artist: 1, _id: 1, coverImageUrl:1 , cloudinaryUrl:1} // Return only necessary fields
      ).limit(5); // Limit results
  
      res.json({
        success: true,
        data: {
          songs: suggestions
        }
      })
    } catch (error) {
      res.status(500).json({success:false, message:"error while autosuggestion",error: error.message });
    }
}


exports.getSong = async (req, res) => {
    const songId = req.params.id;
  
    if (!mongoose.Types.ObjectId.isValid(songId)) {
      return res.status(400).json({ error: "Invalid song ID format" });
    }
  
    try {
      const song = await Song.findById(songId);
      if (!song) return res.status(404).json({ error: "Song not found" });
  
      res.json(song);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

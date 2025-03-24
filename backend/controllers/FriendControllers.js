const Friend = require("../models/Friend");
const FriendRequest = require("../models/FriendRequest");

const User = require("../models/User");

exports.searchFriends = async (req, res) => {
    try {
      const { q } = req.query;
  
      if (!q) {
        return res.status(400).json({ message: "Search query is required" });
      }
  
      const query = q.toLowerCase();
  
      const users = await User.find({
        $or: [
          { firstName: { $regex: `^${query}`, $options: "i" } },
          { lastName: { $regex: `^${query}`, $options: "i" } },
          { Username: { $regex: `^${query}`, $options: "i" } },
        ],
      })
        .select("-password")
        .limit(6);
  
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

// get friend list  
exports.getFriends = async (req, res) => {
    try {
      const userId = req.user.id;
  
      // Find all friendships involving the user
      const friendships = await Friend.find({
        $or: [{ user1: userId }, { user2: userId }],
      }).populate("user1 user2");
  
      const friends = friendships.map((friendship) => {
        return friendship.user1._id.toString() === userId ? friendship.user2 : friendship.user1;
      });
  
      res.status(200).json(friends);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

exports.sendFriendReq = async (req, res) => {
  try {
    const { recipientId } = req.body;
    const senderId = req.user.id;

    // Check if the recipient exists
    const recipient = await User.findById(recipientId);
    if (!recipient) return res.status(404).json({ message: "Recipient not found" });

    // Check if a request already exists
    const existingRequest = await FriendRequest.findOne({
      sender: senderId,
      recipient: recipientId,
    });
    if (existingRequest) return res.status(400).json({ message: "Request already sent" });

    // Create a new friend request
    const friendRequest = new FriendRequest({ sender: senderId, recipient: recipientId });
    await friendRequest.save();
    res.status(201).json({ message: "Friend request sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//get all pedding friend request

 exports.getPendingFriendRequests = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const pendingRequests = await FriendRequest.find({
      recipient: userId,
      status: "pending",
    })
      .populate("sender", "firstName lastName Username image")
      .select("-__v");

    res.status(200).json(pendingRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};




//accept friend request

exports.acceptFriendReq = async (req, res) => {
  try {
    const { requestId } = req.body;
    const userId = req.user.id;

    // Find the request
    console.log("requested", requestId);
    console.log("userId", userId);
    const request = await FriendRequest.findById(requestId);
    if (!request || request.recipient.toString() !== userId)
      return res.status(400).json({ message: "Invalid request" });

    // Update request status
    request.status = "accepted";
    await request.save();

    // Add both users to the friends list
    const newFriendship = new Friend({ user1: request.sender, user2: request.recipient });
    await newFriendship.save();

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// reject 

exports.rejectFriendReq = async (req, res) => {
    try {
      const { requestId } = req.body;
      const userId = req.user.id;
  
      // Find the request
      const request = await FriendRequest.findById(requestId);
      if (!request || request.recipient.toString() !== userId)
        return res.status(400).json({ message: "Invalid request" });
  
      // Update request status
      request.status = "rejected";
      await request.save();
      await FriendRequest.findByIdAndDelete(requestId);
  
      res.status(200).json({ message: "Friend request rejected" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}



exports.removeFriend = async (req, res) => {
  try {
    const { userId1 } = req.body; // Extract user IDs from the request body
    const userId2 = req.user.id;
    console.log(req.body);
    console.log(userId1, userId2);
    // Validate input: Ensure both user IDs are provided
    if (!userId1 || !userId2) {
      return res.status(400).json({ message: "Both userId1 and userId2 are required." });
    }

    // Step 1: Remove the friend relationship from the Friend collection
    const deletedFriend = await Friend.findOneAndDelete({
      $or: [
        { user1: userId1, user2: userId2 },
        { user1: userId2, user2: userId1 },
      ],
    });

    if (!deletedFriend) {
      return res.status(404).json({ message: "Friend relationship not found." });
    }

    // Step 2: Optionally, remove any related accepted friend request
    await FriendRequest.deleteOne({
      $or: [
        { sender: userId1, recipient: userId2, status: "accepted" },
        { sender: userId2, recipient: userId1, status: "accepted" },
      ],
    });

    // Return success response
    return res.status(200).json({ message: "Friend removed successfully." });
  } catch (error) {
    console.error("Error removing friend:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
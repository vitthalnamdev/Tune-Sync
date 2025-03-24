const express = require("express");
const FriendRequest = require("../models/FriendRequest");
const Friend = require("../models/Friend");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// Send a friend request
router.post("/send-friend-request", auth, async (req, res) => {
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
});

// Accept a friend request
router.post("/accept-friend-request", auth, async (req, res) => {
  try {
    const { requestId } = req.body;
    const userId = req.user.id;

    // Find the request
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
});

// Reject a friend request
router.post("/reject-friend-request", auth, async (req, res) => {
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

    res.status(200).json({ message: "Friend request rejected" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get friends list
router.get("/friends", auth, async (req, res) => {
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
});

module.exports = router;
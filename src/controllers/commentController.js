// controllers/commentController.js
import Comment from "../models/commentModel.js";

export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const threadId = req.params.id;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const comment = new Comment({
      text,
      author: req.user.id,
      threadId,
    });

    const savedComment = await comment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding comment", error: error.message });
  }
};

export const getCommentsByThread = async (req, res) => {
  try {
    const comments = await Comment.find({ threadId: req.params.id })
      .populate("author", "username")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching comments", error: error.message });
  }
};

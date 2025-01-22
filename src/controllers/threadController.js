// controllers/threadController.js
import Thread from "../models/threadModel.js";

export const createThread = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const author = req.user.id;

    const thread = new Thread({ title, description, tags, author });
    const savedThread = await thread.save();
    res.status(201).json(savedThread);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating thread", error: error.message });
  }
};

export const getAllThreads = async (req, res) => {
  try {
    const threads = await Thread.find()
      .populate("author", "fullname")
      .sort({ createdAt: -1 });
    res.status(200).json(threads);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching threads", error: error.message });
  }
};

export const getThreadById = async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id).populate(
      "author",
      "fullname"
    );
    if (!thread) return res.status(404).json({ message: "Thread not found" });

    res.status(200).json(thread);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching thread", error: error.message });
  }
};

export const deleteThread = async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id);
    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }

    // // Check if the logged-in user is the author of the thread
    // if (thread.author.toString() !== req.user.id) {
    //   return res
    //     .status(403)
    //     .json({ message: "You are not authorized to delete this thread" });
    // }

    // Delete the thread
    await Thread.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: "Thread deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting thread", error: error.message });
  }
};

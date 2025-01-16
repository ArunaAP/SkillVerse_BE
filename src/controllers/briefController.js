import Brief from '../models/briefModel.js';

export const addBrief = async (req, res) => {
  try {
    const { title, description, deadline } = req.body;
    if (!title || !description || !deadline) {
      return res.status(400).json({ message: "All fields are required: title, description, deadline." });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    const newBrief = new Brief({
      title,
      description,
      deadline,
      createdBy: req.user.id, 
    });

    const savedBrief = await newBrief.save();
    res.status(201).json(savedBrief);

  } catch (error) {
    console.error("Error adding brief:", error.message); // Log the error for debugging
    res.status(500).json({ message: "Failed to add brief.", error: error.message });
  }
};


export const updateBrief = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBrief = await Brief.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedBrief);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update brief.' });
  }
};

export const deleteBrief = async (req, res) => {
  try {
    const { id } = req.params;
    await Brief.findByIdAndDelete(id);
    res.status(200).json({ message: 'Brief deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete brief.' });
  }
};

export const getAllBriefs = async (req, res) => {
  try {
    const briefs = await Brief.find();
    res.status(200).json(briefs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch briefs.' });
  }
};

export const getBriefById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the brief by ID
    const brief = await Brief.findById(id);

    // Check if the brief exists
    if (!brief) {
      return res.status(404).json({ message: 'Brief not found.' });
    }

    // Return the found brief
    res.status(200).json(brief);
  } catch (error) {
    console.error("Error fetching brief by ID:", error.message); // Log the error for debugging
    res.status(500).json({ message: 'Failed to fetch brief.', error: error.message });
  }
};

export const getRecentBriefs = async (req, res) => {
  try {
    // Fetch the 5 most recent briefs, sorted by creation date in descending order
    const recentBriefs = await Brief.find()
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .limit(3); // Limit to 5 recent briefs

    res.status(200).json(recentBriefs);
  } catch (error) {
    console.error("Error fetching recent briefs:", error.message); // Log the error for debugging
    res.status(500).json({ message: "Failed to fetch recent briefs.", error: error.message });
  }
};



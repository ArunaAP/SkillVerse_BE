import Brief from '../models/briefModel.js';

export const addBrief = async (req, res) => {
    try {
      const { title, description, deadline } = req.body;
  
      // Validate input
      if (!title || !description || !deadline) {
        return res.status(400).json({ message: "All fields are required: title, description, deadline." });
      }
  
      // Create a new brief
      const newBrief = new Brief({
        title,
        description,
        deadline,
        createdBy: req.user.id, // Ensure `req.user.id` is available
      });
  
      // Save the brief to the database
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

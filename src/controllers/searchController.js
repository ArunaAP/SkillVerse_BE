import Design from "../models/designModel.js"; // Design model
import Brief from "../models/briefModel.js"; // Brief model

// Search for designs and briefs
export const searchItems = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Query parameter is required" });
  }

  try {
    // Search designs
    const designs = await Design.find({
      title: { $regex: query, $options: "i" }, // Case insensitive search
    })
      .populate("designer", "name") // Populate designer's name
      .populate("brief", "title"); // Populate brief's title

    // Search briefs
    const briefs = await Brief.find({
      title: { $regex: query, $options: "i" }, // Case insensitive search
    });

    // Send response with results
    res.json({
      designs: designs || [],
      briefs: briefs || [],
    });
  } catch (error) {
    console.error("Error during search:", error);
    res
      .status(500)
      .json({ message: "Server error while searching", error: error.message });
  }
};

import Design from '../models/designModel.js';
import jwt from 'jsonwebtoken';

export const getAllDesigns = async (req, res) => {
    try {
      const designs = await Design.find();
      res.status(200).json(designs);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch designs.' });
    }
  };
  

export const addDesign = async (req, res) => {
  try {
    const { title, description, brief, image } = req.body;
    const imageUrl = image || "https://sunshinedesign.com.au/wp-content/uploads/2023/02/stufly_graphic_design_colourful_birds_exploding_out_powder_99bdc5ea-e29b-4c0a-986e-e9f557fdc032-1024x675.png";
    const newDesign = new Design({ title, description, brief, image: imageUrl, designer: req.user.id });
    const savedDesign = await newDesign.save();

    res.status(201).json(savedDesign);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add design.' });
  }
};

export const likeDesign = async (req, res) => {
  try {
    // Decode token to get the user ID
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token using JWT_SECRET
    req.user = decoded;  // This will contain user info, including the user ID

    const { id } = req.params; // Design ID
    const design = await Design.findById(id);

    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }

    if (!design.likedBy.includes(req.user.id)) {
      design.likedBy.push(req.user.id);  // Add user ID to likedBy array
      design.likes += 1;  // Increment like count
    }

    await design.save();
    res.status(200).json(design);  // Return updated design with new like count
  } catch (error) {
    res.status(500).json({ message: 'Failed to like design.' });
  }
};

export const getDesignById = async (req, res) => {
  try {
    const { id } = req.params; // Extract design ID from the route parameters
    const design = await Design.findById(id); // Find the design by its ID

    if (!design) {
      return res.status(404).json({ message: 'Design not found.' }); // Handle case where no design is found
    }

    res.status(200).json(design); // Send back the design data
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch the design.' }); // Handle server errors
  }
};

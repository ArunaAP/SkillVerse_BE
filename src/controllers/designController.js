import Design from '../models/designModel.js';

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
    const { id } = req.params; // Design ID
    const design = await Design.findById(id);

    if (!design.likedBy.includes(req.user.id)) {
      design.likedBy.push(req.user.id);
      design.likes += 1;
    }

    await design.save();
    res.status(200).json(design);
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

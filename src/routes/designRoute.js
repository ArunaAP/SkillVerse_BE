import express from 'express';
import { getAllDesigns, addDesign, likeDesign, getDesignById } from '../controllers/designController.js';
import { verifyDesigner, verifyClient, verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllDesigns);
router.post('/', verifyDesigner,  addDesign);
router.post('/:id/like', verifyClient, likeDesign);
router.get('/:id', getDesignById);

export default router;

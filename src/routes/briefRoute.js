import express from 'express';
import { addBrief, updateBrief, deleteBrief, getAllBriefs, getBriefById } from '../controllers/briefController.js';
import { verifyToken, verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/',verifyToken, addBrief);
router.put('/:id', updateBrief);
router.delete('/:id', deleteBrief);
router.get('/', getAllBriefs);
router.get('/:id', getBriefById);

export default router; 

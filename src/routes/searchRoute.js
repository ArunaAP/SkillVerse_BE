import express from 'express';
import { searchItems } from '../controllers/searchController.js';

const router = express.Router();

// Search endpoint for both designs and briefs
router.get('/search', searchItems);

export default router;

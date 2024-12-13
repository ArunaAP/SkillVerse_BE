import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { authorizedRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get("/user", verifyToken, authorizedRoles("admin"), (req, res)=>{
    res.json({message: "Welcome user"});
});

export default router;
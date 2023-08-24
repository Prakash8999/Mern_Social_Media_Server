import express from "express";
import { VerifyToken } from "../middleware/auth.js";
import { createPost, likePost, readPost, readUserPost } from "../controllers/postControllers.js";
const router = express.Router()

 router.post('/create', VerifyToken, createPost)
router.get('/', VerifyToken,readPost )
router.get('/:userId/post', VerifyToken, readUserPost)
 

// like count 
router.patch('/:id/like', VerifyToken, likePost)

export default router
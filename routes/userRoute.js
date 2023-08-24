import { addRemoveFriends, getUser, getUserFriends } from "../controllers/userDetail.js";
import { VerifyToken } from "../middleware/auth.js";
import express from "express";


const router = express.Router()

router.get('/:id', VerifyToken, getUser)
router.get('/:id/friends', VerifyToken, getUserFriends)

router.patch('/:id/friendId',VerifyToken, addRemoveFriends )


export default router;

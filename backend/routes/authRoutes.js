import express from 'express';
import {
    signUp,
    signIn,
    signOut,
    getAllUsers,
    getCurrentUserProfile,
    updateCurrentUserProfile
} from "../controllers/authController.js";
import {
    authenticationMiddleware,
    authorizeMiddleware
} from "../middleware/authMiddleware.js";
const router = express.Router();

router.route('/').post(signUp)
    .get(authenticationMiddleware,authorizeMiddleware,getAllUsers)
router.post("/auth",signIn );
router.post("/signOut",signOut);
router.route("/profile")
    .get(authenticationMiddleware,getCurrentUserProfile)
    .put(authenticationMiddleware,updateCurrentUserProfile)



export default router;
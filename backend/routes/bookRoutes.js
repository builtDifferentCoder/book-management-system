
import express from "express";
const router = express.Router();
import {authorizeMiddleware,authenticationMiddleware} from "../middleware/authMiddleware.js";
import checkId from "../middleware/checkId.js";
import {
    bookReview, createBook, deleteBook, deleteComment,
    getAllBooks,
    getNewBooks, getRandomBooks,
    getSpecificBook, getTopBooks, updateBook
} from "../controllers/bookController.js";


//public routes

router.get("/all-books",getAllBooks);
router.get("/specific-book/:id",getSpecificBook);
router.get("/new-books",getNewBooks)
router.get("/top-books",getTopBooks)
router.get("/random-books",getRandomBooks)

//restricted user routes
router.post("/:id/reviews",authenticationMiddleware,checkId,bookReview)


//adminRoutes
router.post("/create-book",authenticationMiddleware,authorizeMiddleware,createBook)
router.put("/update-book/:id",authenticationMiddleware,authorizeMiddleware,updateBook)
router.delete("/delete-book/:id",authenticationMiddleware,authorizeMiddleware,deleteBook)
router.delete("/delete-comment",authenticationMiddleware,authorizeMiddleware,deleteComment)

export default router;

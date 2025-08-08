
import express from 'express'
const router = express.Router()

import {authorizeMiddleware,authenticationMiddleware} from "../middleware/authMiddleware.js"
import {
    createGenre,
    updateGenre,
    removeGenre,
    readGenre, listGenre
} from "../controllers/genreController.js";


router.route('/').post(authenticationMiddleware,authorizeMiddleware,createGenre)
router.route("/:id").put(authenticationMiddleware,authorizeMiddleware,updateGenre)
router.route("/:id").delete(authenticationMiddleware,authorizeMiddleware,removeGenre)
router.route("/genres").get(listGenre)
router.route("/:id").get(readGenre)

export default router

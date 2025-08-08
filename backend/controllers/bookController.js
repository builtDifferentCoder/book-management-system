

import Book from "../models/book.js"
import asyncHandler from "../middleware/asyncHandler.js";

const getAllBooks = asyncHandler(async (req, res) => {
    try{
        const books=await Book.find()
        res.json(books)
    }catch(err){
        res.status(500).json({
            message: 'Error while getting books'
        })
    }
})

const createBook = asyncHandler(async (req, res) => {
    try{
        const newBook=new Book(req.body);
        const savedBook=await newBook.save();
        res.status(201).json(savedBook)
    }catch(err){
        res.status(500).json({
            message: 'Error while creating book'
        })
    }
})

const getSpecificBook = asyncHandler(async (req, res) => {
    try{
        const book=await Book.findById({_id:req.params.id})
        if(!book){
            return res.status(404).json({
                message: 'Book not found'
            })
        }
        res.status(200).json(book)
    }catch(err){
        res.status(500).json({
            message: 'Error while getting book'
        })
    }
})

const updateBook = asyncHandler(async (req, res) => {
    try{
        const {id}=req.params
        const updatedBook=await Book.findByIdAndUpdate(id,req.body,{
        new: true
    })
        if(!updatedBook){
            return res.status(404).json({
                message: 'Book not found'
            })
        }
        res.status(200).json(updatedBook)
    }
    catch(err){
        res.status(500).json({
            message: 'Error while updating book'
        })
    }

})

const deleteBook = asyncHandler(async (req, res) => {
    try{
        const id = req.params.id;
        const deletedBook=await Book.findByIdAndDelete({_id:id})
        if(!deletedBook){
            return res.status(404).json({
                message: 'Book not found'
            })
        }
        res.status(200).json(deletedBook)
    }catch(err){
        res.status(500).json({
            message: 'Error while deleting book'
        })
    }
})

const bookReview = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const book = await Book.findById(id);

    if (book) {
      const alreadyReviewd = book.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewd) {
        res.status(400);
        throw new Error("Book already reviewed.");
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      book.reviews.push(review);
      book.numReviews = book.reviews.length;
      book.rating =
        book.reviews.reduce((acc, item) => item.rating + acc, 0) /
        book.reviews.length;
      await book.save();
      res.status(201).json({ message: "Review added." });
    } else {
      res.status(404);
      throw new Error("Book not found.");
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

const deleteComment = asyncHandler(async (req, res) => {
  try {
    const { bookId, reviewId } = req.body;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(400).json({ error: "book not found." });
    }
    const reviewIndex = book.reviews.findIndex(
      (r) => r._id.toString() === reviewId
    );
    if (reviewIndex === -1) {
      return res.status(404).json({ message: "Comment not found." });
    }
    book.reviews.splice(reviewIndex, 1);
    book.numReviews = book.reviews.length;
    book.rating =
      book.reviews.length > 0
        ? book.reviews.reduce((acc, item) => item.rating + acc, 0) /
          book.reviews.length
        : 0;
    await book.save();
    res.json({ message: "Comment deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getNewBooks = asyncHandler(async (req, res) => {
    try{
        const book=await Book.find().sort({createdAt:-1}).limit(10)
        res.status(200).json(book)
    }catch(err){
        res.status(500).json({
            message: 'Error getting books'
        })
    }
})

const getTopBooks = asyncHandler(async (req, res) => {
    try{
        const book=await Book.find({}).sort({numReviews:-1}).limit(10)
        res.status(200).json(book)
    }catch(err){
        res.status(500).json({
            message: 'Error getting top books'
        })
    }
})

const getRandomBooks = asyncHandler(async (req, res) => {
    try{
        const book=await Book.aggregate([{$sample:{size:10}}])
        res.status(200).json(book)
    }
    catch(err){
        res.status(500).json({
            message: 'Error getting random books'
        })
    }
})

export {
        getAllBooks,
        createBook,
        getSpecificBook,
        getNewBooks,
        deleteBook,
        bookReview,
        getRandomBooks,
        getTopBooks,
        deleteComment,
        updateBook,
}
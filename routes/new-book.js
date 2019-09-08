// Require Express
const express = require('express');
// Express Router
const router = express.Router();

// Database
const db = require('../db');
const { Book } = db.models;

// JSON Parser
router.use(express.json());
router.use (express.urlencoded({extended: false}))

// Router (Get)
router.get('/books/new', (req, res) => {
	res.locals.pageTitle = "New Book";
	res.locals.pageHeadline = "New Book";
	res.render('new-book');
});

// Router (Post)
router.post('/books/new', (req, res) => {
	(async () => {
	  
		res.locals.pageTitle = "New Book";
		res.locals.pageHeadline = "New Book";

		// Book Variables
		const id = req.params.id;
		const title = req.body.title;
		const author = req.body.author;
		const genre = req.body.genre;
		const year = req.body.year;

		try {	
		  	const book = await Book.create({ id, title, author, genre, year })
		 		res.redirect(`/book/${book.dataValues.id}`);
		  } catch (error) {
		    if(error.name === 'SequelizeValidationError'){
          const errors = error.errors
          res.render('new-book', {errors})
        } else {
          console.error(error)
          error.status = 500;
          error.message = "Book could not bed added to the library database"
          next(error);
        }
		  }
	})();

});

// Export
module.exports = router;
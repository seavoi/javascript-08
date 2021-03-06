// Require Express
const express = require('express');
// Express Router
const router = express.Router();

// Database
const db = require('../db');
const {Book} = db.models;

// JSON Parser
router.use(express.json());
router.use (express.urlencoded({extended: false}))

// Router (Get)
router.get('/book/:id', (req, res) => {
	(async () => {
    try {
    	const book = await Book.findByPk(req.params.id)
			res.locals.pageTitle = book.title;
			res.locals.pageHeadline = "Update Book";
			res.render('book-detail', {book});
    } catch (error) {
    	console.error('Error fetching book', error);
    }
  })();
});

// Router (Update)
router.post('/book/:id/', async(req, res, next) => {

  // Book Variables
  const id = req.params.id;
  const title = req.body.title;
  const author = req.body.author;
  const genre = req.body.genre;
  const year = req.body.year;

  try {
    const targetedBook = await Book.findByPk(req.params.id)
    await targetedBook.update(req.body)
    .then(() => {
      res.redirect('/books');
  })
  } catch (error) {
    if(error.name === 'SequelizeValidationError'){
      const book = req.body;
      book.id = req.params.id
      res.locals.pageTitle = "Uh oh!";
      res.locals.pageHeadline = "Uh oh!";
      const errors = error.errors
      res.render('book-detail', { errors, book });
      //res.redirect('/book/' + book.id, {errors, book})
    } else {
      console.error(error)
      error.status = 500;
      error.message = "Yikes. We couldn't make that update."
      next(error);
    }
  }
});

// Router (Delete)
router.post('/book/:id/delete', async(req, res, next) => {
	try {
		const targetedBook = await Book.findByPk(req.params.id)
		await targetedBook.destroy(req.body)
		.then(() => {
      res.redirect('/books');
    })
	} catch (error){
		console.error('Fiddle sticks! We encountered an error while we attemped to remove that book to the database.', error);
	}
});

// Export
module.exports = router
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

// Router (Post - Update)
router.post('/book/:id/', async(req, res, next) => {
  try {
    const targetedBook = await Book.findByPk(req.body.id)
    await targetedBook.update({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      year: req.body.year
    }, { fields: ['title', 'author', 'genre', 'year'] }); 
    res.redirect('/books')
  } catch (error) {
    if(error.name === 'SequelizeValidationError'){
      const errors = error.errors
      const book = {
        id: req.body.id,
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        year: req.body.year
      }
      res.render('book-detail', { book , errors})
    } else {
      console.error(error)
      error.status = 500;
      error.message = "Oopsies! We encountered an error while we attemped to add that book to the database."
      next(error);
    }
  }
});

// Router (Post - Delete)
router.post('/book/:id/delete', async(req, res, next) => {
	try {
		const targetedBook = await Book.findByPk(req.body.id);
		await targetedBook.destroy();
		res.redirect('/books');
	} catch (error){
		console.error('Fiddle sticks! We encountered an error while we attemped to remove that book to the database.', error);
	}
})

// Export
module.exports = router
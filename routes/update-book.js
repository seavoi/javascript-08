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
  try {
    const targetedBook = await Book.findByPk(req.params.id)
    await targetedBook.update(req.body)
    .then(() => {
      res.redirect('/books');
    })
  } catch(err) {
    console.log(err)
    res.render('error')
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
})

// Export
module.exports = router
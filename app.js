// Require Express
	const express = require('express');
	const bodyParser = require('body-parser');

	const app = express();

	app.use(bodyParser.urlencoded({ extended: false }));
	app.use('/static', express.static('public'));

	// Pug (By default Express looks for a folder titled "views")
	app.set('view engine', 'pug');

// Database
	const db = require('./db');
	const { Book } = db.models;

	(async () => {
	  await db.sequelize.sync({ force: true });
	 
	  try {

	  	const bookInstances = await Promise.all([
	  		Book.create({
	        title: 'The Hitchhikers Guide to the Galaxy',
	        author: 'Douglas Adams',
	        genre: 'Science Fiction',
	        year: 1980,
	      }),
	      Book.create({
	        title: 'Christine',
	        author: 'Stephen King',
	        genre: 'Horror',
	        year: 1983,
	      }),
	      Book.create({
	        title: 'The Eye of Minds',
	        author: 'James Dashner',
	        genre: 'Science Fiction',
	        year: 2013,
	      }),
	    ]);

	    /* const booksJSON = bookInstances.map(book => book.toJSON());
	    console.log(booksJSON); */

	  } catch (error) {

	    console.error('Error connecting to the database: ', error);

	  }
	})();

// Routes

	// Index Route (Redirected to /books)
	app.get('/', (req, res) => {
		res.redirect('/books');
	});

	// Books Route
	app.get('/books', (req, res) => {
		res.locals.pageTitle = "Books";
		res.locals.pageHeadline = "Books";
		res.render('books');
	});

	// New Books Route - Get
	app.get('/books/new', (req, res) => {
		res.locals.pageTitle = "New Book";
		res.locals.pageHeadline = "New Book";
		res.render('new-book');
	});

	// New Books Route - Post
	app.post('/books/new', (req, res) => {
		res.locals.pageTitle = "New Book";
		res.locals.pageHeadline = "New Book";
		res.redirect('/books');
	});

	// Books by ID Route - Get 
	app.get('/books/:id', (req, res, next) => { /* Needs specific ID */
		const id = req.params.id;
		res.locals.pageTitle = "Book title goes here";
		res.locals.pageHeadline = "Update Book";
		res.render('book-detail');
	});

	// Books by ID Route - Post

	// Books by ID Delete Route - Post

// Errors
	app.use((req, res, next) => {
		const err = new Error('Page Not Found');
		err.status = 404;
		res.status(404);
		res.locals.pageTitle = "Page Not Found";
		res.locals.pageHeadline = "Page Not Found";
		res.render('page-not-found');
	});

	app.use((err, req, res, next) => {
		console.error(err);
		res.status(500);
		res.locals.pageTitle = "Page Not Found";
		res.locals.pageHeadline = "Server Error";
		res.render('error');
	});

// Development Server
	app.listen(7500, () => {
		console.log('The application is running on localhost:7500.');
	});

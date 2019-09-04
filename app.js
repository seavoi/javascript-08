// Require Express
	const express = require('express');
	const app = express();

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

	// Index Route
	app.get('/', (req, res) => { /* SEAN THIS NEEDS TO BE REDIRECTED */
		res.render('index');
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
		res.render('new_book');
	});

	// New Books Route - Post
	app.post('/books/new', (req, res) => {
		res.locals.pageTitle = "New Book";
		res.locals.pageHeadline = "New Book";
		res.render('new_book');
	});

	// Books by ID Route - Get

	// Books by ID Route - Post

	// Books by ID Delete Route - Post

// Development Server
	app.listen(7500, () => {
		console.log('The application is running on localhost:7500.');
	});
// Require Express
const express = require('express');

const app = express();

app.use('/static', express.static('public'));

// Pug (By default Express looks for a folder titled "views")
app.set('view engine', 'pug');

// Routes

// Index Route (Redirected to /books)
app.get('/', (req, res) => {
	res.redirect('/books');
});

// Books Route
const allBooks = require('./routes/books');
app.use(allBooks);

// New Book Route
const newBook = require('./routes/new-book');
app.use(newBook);

// Update Book Route 
const updateBook = require('./routes/update-book');
app.use(updateBook);

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

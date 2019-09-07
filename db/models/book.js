const Sequelize = require('sequelize');

module.exports = (sequelize) => {
	class Book extends Sequelize.Model {}
	Book.init({
		id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
	  title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Yikes. We require a title for this book.'
        },
        notEmpty: {
          msg: 'Yikes. We require a title for this book.'
        }
      },
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Jinkies. We require an author for this book.'
        },
        notEmpty: {
          msg: 'Jinkies. We require an author for this book.'
        }
      },
    },
    genre: {
      type: Sequelize.STRING,
    },
    year: {
      type: Sequelize.INTEGER,
    },
	}, { sequelize });

	return Book;
};
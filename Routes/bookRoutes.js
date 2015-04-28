var express = require('express');

var routes = function(Book){

    var bookRouter = express.Router();

    bookRouter.route('/')
        .post(function(req, res){
            var book = new Book(req.body);
            console.log(book);

            book.save();
            res.status(201).send(book);

        })
        .get(function(req, res){

            var query = {};

            if(req.query.genre){
                query.genre = req.query.genre;
            }

            Book.find(query, function(err, books){
                if(err){
                    res.status(500).send(err);
                } else {
                    res.json(books);
                }
            });
        });

    bookRouter.use('/:bookId', function(req, res, next){
        if(req.query.genre){
            query.genre = req.query.genre;
        }

        Book.findById(req.params.bookId, function(err, book){
            if(err){
                res.status(500).send(err);
            } else if (book) {
                req.book = book;
                next();
            } else {
                res.json(404).send('no book found');
            }
        });
    });


    bookRouter.route('/:bookId')
        .get(function(req, res){
            res.json(req.book);
        }
    )
    .put(function(req, res){

        book.title = req.body.title;
        book.author = req.body.author;
        book.genre = req.body.genre;
        book.read = req.body.read;

        book.save();


        res.json(req.book);
    });

    return bookRouter;

};


module.exports = routes;
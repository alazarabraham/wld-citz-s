const express = require('express');
const router = express.Router();
const db = require("../mysql/dbConfig");

router.get("/getAllBooks", (request, response)=>{
    db.query("select * from books", (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.get("/getBook/:id", (request, response)=>{
    db.query("select * from books where id = ?", [request.params.id], (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.get("/getAllBookInfo", (request, response)=>{
    db.query(`select books.id, books.title , books.description, books.release_year, books.cover, 
    languages.name AS language, authors.first_name, authors.last_name,countries.id AS country_id, countries.name AS country_name, 
    countries.flag, users.id AS userId, users.username, IFNULL(SUM(book_likes.book_like), 0) as total_likes
    from books 
    inner join languages on books.language_id = languages.id 
    inner join authors on books.author_id = authors.id 
    inner join countries on books.country_id = countries.id
    inner join users on books.user_id = users.id
    left JOIN book_likes ON books.id = book_likes.book_id 
    group by books.id
    `, (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.get("/getAllBookInfoByAuthor/:id", (request, response)=>{
    db.query(`select books.id, books.title , books.description, books.release_year, books.cover, 
    languages.name AS language, authors.first_name, authors.last_name,countries.id AS country_id, countries.name AS country_name, 
    countries.flag, users.id AS userId, users.username, IFNULL(SUM(book_likes.book_like), 0) as total_likes
    from books 
    inner join languages on books.language_id = languages.id 
    inner join authors on books.author_id = authors.id 
    inner join countries on books.country_id = countries.id
    inner join users on books.user_id = users.id
    left JOIN book_likes ON books.id = book_likes.book_id 
    where authors.id = ?
    group by books.id
    `, [request.params.id], (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.get("/getAllBookInfoByCountry/:id", (request, response)=>{
    db.query(`select books.id, books.title , books.description, books.release_year, books.cover, 
    languages.name AS language, authors.first_name, authors.last_name,countries.id AS country_id, countries.name AS country_name, 
    countries.flag, users.id AS userId, users.username, IFNULL(SUM(book_likes.book_like), 0) as total_likes
    from books 
    inner join languages on books.language_id = languages.id 
    inner join authors on books.author_id = authors.id 
    inner join countries on books.country_id = countries.id
    inner join users on books.user_id = users.id
    left JOIN book_likes ON books.id = book_likes.book_id 
    where countries.id = ?
    group by books.id
    `, [request.params.id], (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.get("/getAllBookInfoById/:id", (request, response)=>{
    db.query(`select books.id, books.title , books.description, books.release_year, books.cover, 
    languages.name AS language, authors.first_name, authors.last_name,countries.id AS country_id, countries.name AS country_name, 
    countries.flag, users.id AS userId, users.username
    from books 
    inner join languages on books.language_id = languages.id 
    inner join authors on books.author_id = authors.id 
    inner join countries on books.country_id = countries.id
    inner join users on books.user_id = users.id where books.id = ?
    `,[request.params.id], (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.post("/addBook", (request, response)=>{
    db.query("insert into books(title, description, release_year, language_id, author_id, user_id, country_id, cover) values(?, ? , ?, ?, ?, ?, ? , ?)", [request.body.title, request.body.description, request.body.release_year, request.body.language_id, request.body.author_id, request.body.user_id, request.body.country_id,request.body.cover], (err, results)=>{
        if(err) throw err;
        response.send("Book successfully added");
    })
})
module.exports = router;
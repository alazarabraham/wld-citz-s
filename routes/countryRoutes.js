const express = require('express');
const router = express.Router();
const db = require("../mysql/dbConfig");

router.get("/getAllCountries", (request, response)=>{
    db.query("select * from countries order by name asc", (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.get("/getCountry/:id", (request, response)=>{
    db.query("select * from countries where id = ?", [request.params.id], (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})
router.get("/getAllCountryInfo", (request, response)=>{
    db.query(`SELECT countries.id, countries.name, countries.flag, countries.banner_img, languages.name AS language,
    COUNT(distinct books.id) as total_books, COUNT(distinct films.id) as total_films, COUNT(distinct history_topics.id) as total_history_topics
    FROM countries
    INNER JOIN languages ON countries.language_id = languages.id
    left JOIN books ON books.country_id = countries.id
    left JOIN films ON countries.id = films.country_id
    left JOIN history_topics ON countries.id = history_topics.country_id
    group by countries.id, books.country_id, films.country_id, history_topics.country_id 
    order by countries.name asc
    `, [request.params.id], (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.get("/getAllCountryInfoById/:id", (request, response)=>{
    db.query(`select countries.name , countries.capital, countries.flag, 
    languages.name AS language
    from countries 
    inner join languages on countries.language_id = languages.id where countries.id = ?`, [request.params.id], (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.post("/addCountry", (request, response)=>{
    db.query("insert into countries(name,flag,language_id, capital, banner_img) values(?, ? , ?, ?, ?)", [request.body.name, request.body.flag, request.body.language_id, request.body.capital, request.body.banner_img], (err, results)=>{
        if(err) throw err;
        response.send("Country successfully added");
    })
})


router.get("/getAllBooksByCountryId/:id", (request, response)=>{
    db.query(`select books.id, books.title , books.description, books.release_year, books.cover, 
    languages.name AS language, authors.first_name, authors.last_name,countries.id AS country_id, countries.name AS country_name, 
    countries.flag, users.id AS userId, users.username
    from books 
    inner join languages on books.language_id = languages.id 
    inner join authors on books.author_id = authors.id 
    inner join countries on books.country_id = countries.id
    inner join users on books.user_id = users.id where books.country_id = ?`, [request.params.id], (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.get("/getAllFilmsByCountryId/:id", (request, response)=>{
    db.query(`select * from films where country_id = ?`, [request.params.id], (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})




module.exports = router;
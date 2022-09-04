const express = require('express');
const router = express.Router();
const db = require("../mysql/dbConfig");

router.get("/getAllFilms", (request, response)=>{
    db.query("select * from films", (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.get("/getFilm/:id", (request, response)=>{
    db.query("select * from films where id = ?", [request.params.id], (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.get("/getAllFilmInfo", (request, response)=>{
    db.query(`select films.id, films.title , films.description, films.release_year, films.poster, 
    languages.name AS language, countries.id AS country_id, countries.name AS country_name, 
    countries.flag, users.id AS userId, users.username,
    IFNULL(SUM(film_likes.film_like), 0) as total_likes
    from films 
    inner join languages on films.language_id = languages.id 
    inner join countries on films.country_id = countries.id
    inner join users on films.user_id = users.id
    left JOIN film_likes ON films.id = film_likes.film_id 
    group by films.id
    `, (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.get("/getAllFilmInfoByCountry/:id", (request, response)=>{
    db.query(`select films.id, films.title , films.description, films.release_year, films.poster, 
    languages.name AS language, countries.id AS country_id, countries.name AS country_name, 
    countries.flag, users.id AS userId, users.username,
    IFNULL(SUM(film_likes.film_like), 0) as total_likes
    from films 
    inner join languages on films.language_id = languages.id 
    inner join countries on films.country_id = countries.id
    inner join users on films.user_id = users.id
    left JOIN film_likes ON films.id = film_likes.film_id 
    where countries.id = ?
    group by films.id
    `, [request.params.id], (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.get("/getAllFilmInfoById/:id", (request, response)=>{
    db.query(`select films.id, films.title , films.description, films.release_year, films.poster, 
    languages.name AS language, countries.id AS country_id, countries.name AS country_name, 
    countries.flag, users.id AS userId, users.username
    from films 
    inner join languages on films.language_id = languages.id 
    inner join countries on films.country_id = countries.id
    inner join users on films.user_id = users.id where films.id = ?
    `,[request.params.id], (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.post("/addFilm", (request, response)=>{
    db.query("insert into films(title, description, release_year, language_id, user_id, country_id, poster) values(?, ? , ?, ?, ?, ?, ?)", [request.body.title, request.body.description, request.body.release_year, request.body.language_id, request.body.user_id, request.body.country_id,request.body.poster], (err, results)=>{
        if(err) throw err;
        response.send("Film successfully added");
    })
})

router.put("/editFilm", (request, response)=>{
    db.query("insert into films(title, description, release_year, language_id, user_id, country_id, poster) values(?, ? , ?, ?, ?, ?, ?)", [request.body.title, request.body.description, request.body.release_year, request.body.language_id, request.body.user_id, request.body.country_id,request.body.poster], (err, results)=>{
        if(err) throw err;
        response.send("Film successfully added");
    })
})


module.exports = router;
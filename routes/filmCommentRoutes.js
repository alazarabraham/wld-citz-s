const express = require('express');
const router = express.Router();
const db = require("../mysql/dbConfig");

router.get("/getAllFilmComments", (request, response)=>{
    db.query("select * from film_comments", (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.get("/getFilmComment/:id", (request, response)=>{
    db.query("select * from film_comments where id = ?", [request.params.id], (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.get("/getAllCommentsByFilmId/:id", (request, response)=>{
    db.query(`select film_comments.id, film_comments.comment, film_comments.rating, film_comments.created_at,
    users.id as userId, users.username, users.avatar
    from film_comments 
    inner join users on film_comments.user_id = users.id  
    where film_id = ?`, [request.params.id], (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})
router.get("/getFilmRatingInfoByFilmId/:id", (request, response)=>{
    db.query(`select  
    IFNULL(SUM(case when rating = 5 then 1 else 0 end), 0) as five_star_ratings,
    IFNULL(SUM(case when rating = 4 then 1 else 0 end), 0) as four_star_ratings,
    IFNULL(SUM(case when rating = 3 then 1 else 0 end), 0) as three_star_ratings,
    IFNULL(SUM(case when rating = 2 then 1 else 0 end), 0) as two_star_ratings,
    IFNULL(SUM(case when rating = 1 then 1 else 0 end), 0) as one_star_ratings,
    IFNULL(ROUND(avg(rating), 1), 0) as avg_rating,
    IFNULL(count(rating), 0) as total_ratings
    from film_comments where film_id = ?`, [request.params.id], (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.post("/addFilmComment", (request, response)=>{
    db.query("insert into film_comments(user_id, film_id, comment, rating) values(?, ?, ?, ?)", [request.body.user_id, request.body.film_id, request.body.comment, request.body.rating], (err, results)=>{
        if(err) throw err;
        response.send("Film comment successfully added");
    })
})

router.delete("/deleteFilmComment/:id", (request, response)=>{
    db.query("delete from film_comments where id = ?", [request.params.id ], (err, results)=>{
        if(err) throw err;
        response.send("Film comment successfully deleted");
    })
})
module.exports = router;
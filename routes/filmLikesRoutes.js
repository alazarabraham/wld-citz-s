const express = require('express');
const router = express.Router();
const db = require("../mysql/dbConfig");

router.get("/getAllFilmLikes", (request, response)=>{
    db.query("select * from film_likes", (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.get("/getFilmLike/:id", (request, response)=>{
    db.query("select * from film_likes where id = ?", [request.params.id], (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.get("/getFilmLikeByUserId/:id/:userId", (request, response)=>{
    db.query("select * from film_likes where film_id = ? AND user_id = ?", [request.params.id, request.params.userId], (err, results)=>{
        if(err) throw err;
        if(results.length == 0){
            response.send([]);
        }else{
            response.send(results);
        }
    })
})

router.post("/addFilmLike", (request, response)=>{
    db.query("insert into film_likes(user_id, film_id, film_like) values(?, ?, ?)", [request.body.user_id, request.body.film_id, request.body.film_like], (err, results)=>{
        if(err) throw err;
        response.send("Film like successfully added");
    })
})

router.put("/updateFilmLike/:id/:film_id", (request, response)=>{
    db.query("update film_likes set film_like = ? where film_id = ? AND id = ?", [request.body.film_like, request.params.film_id, request.params.id], (err, results)=>{
        if(err) throw err;
        response.send("Film like successfully updated");
    })
})

module.exports = router;
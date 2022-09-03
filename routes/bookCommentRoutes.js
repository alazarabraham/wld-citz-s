const express = require('express');
const router = express.Router();
const db = require("../mysql/dbConfig");

router.get("/getAllBookComments", (request, response)=>{
    db.query("select * from book_comments", (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.get("/getBookComment/:id", (request, response)=>{
    db.query("select * from book_comments where id = ?", [request.params.id], (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.get("/getAllCommentsByBookId/:id", (request, response)=>{
    db.query(`select book_comments.id, book_comments.comment, book_comments.rating, book_comments.created_at,
    users.id as userId, users.username, users.avatar
    from book_comments 
    inner join users on book_comments.user_id = users.id  
    where book_id = ?`, [request.params.id], (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})
router.get("/getBookRatingInfoByBookId/:id", (request, response)=>{
    db.query(`select  
    IFNULL(SUM(case when rating = 5 then 1 else 0 end), 0) as five_star_ratings,
    IFNULL(SUM(case when rating = 4 then 1 else 0 end), 0) as four_star_ratings,
    IFNULL(SUM(case when rating = 3 then 1 else 0 end), 0) as three_star_ratings,
    IFNULL(SUM(case when rating = 2 then 1 else 0 end), 0) as two_star_ratings,
    IFNULL(SUM(case when rating = 1 then 1 else 0 end), 0) as one_star_ratings,
    IFNULL(ROUND(avg(rating), 1), 0) as avg_rating,
    IFNULL(count(rating), 0) as total_ratings
    from book_comments where book_id = ?`, [request.params.id], (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.post("/addBookComment", (request, response)=>{
    db.query("insert into book_comments(user_id, book_id, comment, rating) values(?, ?, ?, ?)", [request.body.user_id, request.body.book_id, request.body.comment, request.body.rating], (err, results)=>{
        if(err) throw err;
        response.send("Book comment successfully added");
    })
})

router.delete("/deleteBookComment/:id", (request, response)=>{
    db.query("delete from book_comments where id = ?", [request.params.id ], (err, results)=>{
        if(err) throw err;
        response.send("Book comment successfully deleted");
    })
})
module.exports = router;
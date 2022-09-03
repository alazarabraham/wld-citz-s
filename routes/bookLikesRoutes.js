const express = require('express');
const router = express.Router();
const db = require("../mysql/dbConfig");

router.get("/getAllBookLikes", (request, response)=>{
    db.query("select * from book_likes", (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.get("/getBookLike/:id", (request, response)=>{
    db.query("select * from book_likes where id = ?", [request.params.id], (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.get("/getBookLikeByUserId/:id/:userId", (request, response)=>{
    db.query("select * from book_likes where book_id = ? AND user_id = ?", [request.params.id, request.params.userId], (err, results)=>{
        if(err) throw err;
        if(results.length == 0){
            response.send([]);
        }else{
            response.send(results);
        }
    })
})

router.post("/addBookLike", (request, response)=>{
    db.query("insert into book_likes(user_id, book_id, book_like) values(?, ?, ?)", [request.body.user_id, request.body.book_id, request.body.book_like], (err, results)=>{
        if(err) throw err;
        response.send("Book like successfully added");
    })
})

router.put("/updateBookLike/:id/:book_id", (request, response)=>{
    db.query("update book_likes set book_like = ? where book_id = ? AND id = ?", [request.body.book_like, request.params.book_id, request.params.id], (err, results)=>{
        if(err) throw err;
        response.send("Book like successfully updated");
    })
})

module.exports = router;
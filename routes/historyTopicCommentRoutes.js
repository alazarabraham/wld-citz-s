const express = require('express');
const router = express.Router();
const db = require("../mysql/dbConfig");

router.get("/getAllHistoryTopicComments", (request, response)=>{
    db.query("select * from history_topic_comments", (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.get("/getHistoryTopicComment/:id", (request, response)=>{
    db.query("select * from history_topic_comments where id = ?", [request.params.id], (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.get("/getAllCommentsByHistoryTopicId/:id", (request, response)=>{
    db.query(`select history_topic_comments.id, history_topic_comments.comment, history_topic_comments.created_at,
    users.id as userId, users.username, users.avatar
    from history_topic_comments 
    inner join users on history_topic_comments.user_id = users.id  
    where history_topic_id = ?`, [request.params.id], (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})


router.post("/addHistoryTopicComment", (request, response)=>{
    db.query("insert into history_topic_comments(user_id, history_topic_id, comment) values( ?, ?, ?)", [request.body.user_id, request.body.history_topic_id, request.body.comment], (err, results)=>{
        if(err) throw err;
        response.send("History topic comment successfully added");
    })
})

router.delete("/deleteHistoryTopicComment/:id", (request, response)=>{
    db.query("delete from history_topic_comments where id = ?", [request.params.id ], (err, results)=>{
        if(err) throw err;
        response.send("History topic comment successfully deleted");
    })
})
module.exports = router;
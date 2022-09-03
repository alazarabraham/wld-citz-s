const express = require('express');
const router = express.Router();
const db = require("../mysql/dbConfig");

router.get("/getAllHistoryTopicLikes", (request, response)=>{
    db.query("select * from history_topic_likes", (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.get("/getHistoryTopicLike/:id", (request, response)=>{
    db.query("select * from history_topic_likes where id = ?", [request.params.id], (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.get("/getHistoryTopicLikeByUserId/:id/:userId", (request, response)=>{
    db.query("select * from history_topic_likes where history_topic_id = ? AND user_id = ?", [request.params.id, request.params.userId], (err, results)=>{
        if(err) throw err;
        if(results.length == 0){
            response.send([]);
        }else{
            response.send(results);
        }
    })
})

router.post("/addHistoryTopicLike", (request, response)=>{
    db.query("insert into history_topic_likes(user_id, history_topic_id, history_topic_like) values(?, ?, ?)", [request.body.user_id, request.body.history_topic_id, request.body.history_topic_like], (err, results)=>{
        if(err) throw err;
        response.send("History topic like successfully added");
    })
})

router.put("/updateHistoryTopicLike/:id/:history_topic_id", (request, response)=>{
    db.query("update history_topic_likes set history_topic_like = ? where history_topic_id = ? AND id = ?", [request.body.history_topic_like, request.params.history_topic_id, request.params.id], (err, results)=>{
        if(err) throw err;
        response.send("History topic like successfully updated");
    })
})

module.exports = router;
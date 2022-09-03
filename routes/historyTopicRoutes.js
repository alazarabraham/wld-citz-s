const express = require('express');
const router = express.Router();
const db = require("../mysql/dbConfig");

router.get("/getAllHistoryTopics", (request, response)=>{
    db.query("select * from history_topics", (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.get("/getHistoryTopic/:id", (request, response)=>{
    db.query("select * from history_topics where id = ?", [request.params.id], (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.get("/getAllHistoryTopicInfo", (request, response)=>{
    db.query(`select history_topics.id, history_topics.name , history_topics.description, 
    countries.id AS country_id, countries.name AS country_name, 
    countries.flag, users.id AS userId, users.username, 
    IFNULL(SUM(history_topic_likes.history_topic_like), 0) as total_likes
    from history_topics 
    inner join countries on history_topics.country_id = countries.id
    inner join users on history_topics.user_id = users.id
    left JOIN history_topic_likes ON history_topics.id = history_topic_likes.history_topic_id 
    group by history_topics.id
    `, (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.post("/getAllHistoryTopicInfoSearch", (request, response)=>{
    db.query(`select history_topics.id, history_topics.name , history_topics.description, 
    countries.id AS country_id, countries.name AS country_name, 
    countries.flag, users.id AS userId, users.username, 
    IFNULL(SUM(history_topic_likes.history_topic_like), 0) as total_likes
    from history_topics 
    inner join countries on history_topics.country_id = countries.id
    inner join users on history_topics.user_id = users.id
    left JOIN history_topic_likes ON history_topics.id = history_topic_likes.history_topic_id 
    WHERE CONCAT(history_topics.name, '', history_topics.description, '', countries.name, '', users.username, '') LIKE "%${request.body.keyword}%"
    group by history_topics.id
    `, (err, results)=>{
        if(err) throw err;
        response.send(results);
        console.log(results);
        
    })
})

router.get("/getAllHistoryTopicInfoById/:id", (request, response)=>{
    db.query(`select history_topics.id, history_topics.name , history_topics.description, 
    history_topics.created_at, countries.id AS country_id, countries.name AS country_name, 
    countries.flag, users.id AS userId, users.username
    from history_topics 
    inner join countries on history_topics.country_id = countries.id
    inner join users on history_topics.user_id = users.id where history_topics.id = ?
    `,[request.params.id], (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.post("/addHistoryTopic", (request, response)=>{
    db.query("insert into history_topics(name, description, user_id, country_id) values(?, ?, ?, ?)", [request.body.name, request.body.description, request.body.user_id, request.body.country_id], (err, results)=>{
        if(err) throw err;
        response.send("History topic successfully added");
    })
})
module.exports = router;
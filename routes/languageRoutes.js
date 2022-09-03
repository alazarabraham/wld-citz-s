const express = require('express');
const router = express.Router();
const db = require("../mysql/dbConfig");

router.get("/getAllLanguages", (request, response)=>{
    db.query("select * from languages order by name asc", (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.get("/getLanguage/:id", (request, response)=>{
    db.query("select * from languages where id = ?", [request.params.id], (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.post("/addLanguage", (request, response)=>{
    db.query("insert into languages(name) values(?)", [request.body.name], (err, results)=>{
        if(err) throw err;
        response.send("Language successfully added");
    })
})

module.exports = router;
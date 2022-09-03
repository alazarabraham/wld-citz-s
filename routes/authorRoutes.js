const express = require('express');
const router = express.Router();
const db = require("../mysql/dbConfig");

router.get("/getAllAuthors", (request, response)=>{
    db.query("select * from authors order by last_name asc", (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.get("/getAuthor/:id", (request, response)=>{
    db.query("select * from authors where id = ?", [request.params.id], (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})


router.post("/addAuthor", (request, response)=>{
    db.query("insert into authors(first_name, last_name) values(?, ?)", [request.body.first_name, request.body.last_name], (err, results)=>{
        if(err) throw err;
        response.send("Author successfully added");
    })
})
module.exports = router;
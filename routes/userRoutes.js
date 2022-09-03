const { request } = require('express');
const express = require('express');
const router = express.Router();
const db = require("../mysql/dbConfig");

router.get("/getAllUsers", (request, response)=>{
    db.query("select * from users", (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.get("/getUser/:id", (request, response)=>{
    db.query("select * from users where id = ?", [request.params.id], (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.post("/addUser", (request, response)=>{
    db.query(`insert into users(first_name, last_name, country_id, username, password, admin, bio, avatar, email) values (?, ? ,? ,? ,? ,? ,? ,? ,?)`, 
    [request.body.first_name, request.body.last_name, request.body.country_id, request.body.username, request.body.password, request.body.admin, request.body.bio, request.body.avatar, request.body.email],
    (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})
router.get("/getUserInfo/:id", (request, response)=>{
    db.query(`
    select users.id, users.first_name, users.last_name, users.admin, users.avatar,
    users.bio, users.email, users.created_at, users.username, 
    countries.name AS country_name, countries.flag
    from users
    inner join countries on users.country_id = countries.id
    where users.id = ?`, [request.params.id], (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.get("/getUserBookPostCount/:id", (request, response)=>{
    db.query(`
    select
    COUNT(books.id) as books_posted_count
    from users
    left JOIN books ON users.id = books.user_id
    where users.id = ?`, [request.params.id], (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.get("/getUserFilmPostCount/:id", (request, response)=>{
    db.query(`
    select
    COUNT(films.id) as films_posted_count
    from users
    left JOIN films ON users.id = films.user_id
    where users.id = ?`, [request.params.id], (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.get("/getUserHistoryPostCount/:id", (request, response)=>{
    db.query(`
    select
    COUNT(history_topics.id) as history_posted_count
    from users
    left JOIN history_topics ON users.id = history_topics.user_id
    where users.id = ?`, [request.params.id], (err, results)=>{
        if(err) throw err;
        response.send(results);
    })
})

router.put("/updateUser/:id", (request, response)=>{
    db.query(`update users 
    set first_name = ?, last_name = ?, bio = ?, email = ?
    where id = ?`, [request.body.first_name, request.body.last_name, request.body.bio, request.body.email, request.params.id], (err, results)=>{
        if(err) throw err;
        request.session.avatar = request.body.avatar;
        response.send("User successfully updated");
    })
})

router.put("/updateAvatar/:id", (request, response)=>{
    db.query(`update users set avatar = ? where id = ?`, [request.body.avatar, request.params.id], (err, results)=>{
        if(err) throw err;
        request.session.avatar = request.body.avatar;
        response.send("Avatar successfully updated");
    })
})


module.exports = router;
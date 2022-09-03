const express = require("express");
const router = express.Router();
const db = require("../mysql/dbConfig");

router.get("/getLoggedInUser", (request, response)=>{
    if(request.session.loggedIn){
        response.send({username: request.session.username, userId: request.session.userId, loggedIn: request.session.loggedIn, avatar: request.session.avatar});
    }else{
        request.session.loggedIn = false;
        response.send({loggedIn: request.session.loggedIn});
    }
})

router.post("/login", (request, response)=>{
    let username = request.body.username;
    let password = request.body.password;
    if(username && password){
    db.query(`select * from users where username = ? AND password = ?`, [username, password ], (err, results)=>{
        if(err) throw err;
        if(results.length > 0){
            request.session.loggedIn = true;
            request.session.username = username;
            console.log(results[0]);
            if(results != undefined){
                request.session.userId = results[0].id;
                request.session.avatar = results[0].avatar;
            }
            response.send({user: results, Status: "user successfully logged in"});
        }else{
            request.session.loggedIn = false;
            response.send({loggedIn: request.session.loggedIn});
        }
    })
}
})


router.get("/signout", (request, response)=>{
    request.session.loggedIn = false;       
    response.send("User logged out");
})

module.exports = router;
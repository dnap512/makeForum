var express = require("express");
var router = express.Router();
var User = require("../models/User");
var util  = require("../util");
var Client = require('node-rest-client').Client;
var client = new Client();

// Index
router.get("/", function(req, res){
    res.render("../views/join/join");
});

router.post("/create", function(req, res){
    User.create(req.body, function(err,user){
        if(err){
            req.flash("user", req.body);
            req.flash("errors", util.parseError(err));
            return res.json(err);
        }
        return res.render("../views/join/welcome");
    });
    var info = { 
        headers : {
        "Content-Type" : "application/json", 
        "Authorization" : "Bearer PwWr9KyjWbhUsNyPtZuJUB9MP7o1t4eHH3c6qa6B8f7xPcse7jWNsdv4YtK4efCC"
        },
        data : {
            walletType : "LUNIVERSE",
            userKey : req.body.ID
        }   
    }
    client.post("https://api.luniverse.io/tx/v1.0/wallets", info, function(data, res){
        console.log(data);
    })
});


module.exports = router;

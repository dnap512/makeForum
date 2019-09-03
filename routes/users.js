var express = require("express");
var router = express.Router();
var User = require("../models/User");
var util  = require("../util");

// Index

router.get("/", util.isLoggedin, function(req, res){
    User.find({})
    .exec(function(err, users){
     if(err) return res.json(err);
     res.render("../views/users/users", {users:users});
    });
});

router.get("/new", function(req, res){
    var user = req.flash("user")[0] || {};
    var errors = req.flash("errors")[0] || {};
    res.render("/", { user:user, errors:errors });
});
   


// show
router.get("/:ID", util.isLoggedin, function(req, res){
    User.findOne({ID:req.params.ID}, function(err, user){
     if(err) return res.json(err);
     res.render("users/show", {user:user});
    });
});



module.exports = router;

function checkPermission(req, res, next){
    User.findOne({username:req.params.username}, function(err, user){
     if(err) return res.json(err);
     if(user.id != req.user.id) return util.noPermission(req, res);
   
     next();
    });
}
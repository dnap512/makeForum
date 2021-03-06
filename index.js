var express = require("express");
var mongoose = require("mongoose");
var bodyParser  = require("body-parser");
var methodOverride = require("method-override");
var flash = require("connect-flash");
var session = require("express-session");
var passport = require("./config/passport");
var app = express();


// DB setting
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb+srv://dnap512:1@cluster0-wt1tc.mongodb.net/test');
var db = mongoose.connection;
db.once("open", function(){
  console.log("DB connected");
});
db.on("error", function(err){
  console.log("DB ERROR : ", err);
});

// Other settings
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(flash());
app.use(session({secret:"MySecret", resave:true, saveUninitialized:true}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Middlewares
app.use(function(req,res,next){
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
 })

app.use("/", require("./routes/home"));
app.use("/join", require("./routes/join"));
app.use("/users", require("./routes/users"));
app.use("/posts", require("./routes/posts"));



// Port setting
var port = 4000;
app.listen(port, function(){
    console.log("server on! http://localhost:"+port);
  });

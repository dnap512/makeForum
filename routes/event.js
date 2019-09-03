// routes/posts.js

var express = require("express");
var router  = express.Router();
var Post    = require("../models/Post");
var util  = require("../util");
var headers = require("../config/headers");
var Client = require('node-rest-client').Client;
var client = new Client();


event
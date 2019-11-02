var express = require('express');
var app = express();
var data = require("./StudentInformations.json");

var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mean.psu.ac.th:27017/";

var options = { useUnifiedTopology: true, useNewUrlParser: true };

// set the view engine to ejs
app.set('view engine', 'ejs');

//Home
app.get("/", function (req, res) {
    res.render('pages/Home');
});

//Retrieve all students
app.get("/student", function (req, res) {
    MongoClient.connect(url, options, function (err, db) {
        if (err) throw err;
        var dbo = db.db("students");
        var query = {};
        dbo.collection("StudentInformations").find(query).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.render('pages/student', { data : result });
            db.close();
        });
    });
});

//Create a students
app.get("/student/:add", function (req, res) {
    var pid = req.params.sid;
    //Get the class detail from mongodb
    MongoClient.connect(url, options, function (err, db) {
        if (err) throw err;
        var dbo = db.db("students");
        var query = {
            StudentID : sid
        };
        dbo.collection("StudentInformations").findOne(query , function (err, result) {
            if (err) throw err;
            console.log(result);
            res.render('pages/create', { detail : result });
            db.close();
        });
    });
});
//View a students
app.get("/studentdetail/:sid", function (req, res) {
    var pid = req.params.sid;
    //Get the class detail from mongodb
    MongoClient.connect(url, options, function (err, db) {
        if (err) throw err;
        var dbo = db.db("students");
        var query = {
            StudentID : sid
        };
        dbo.collection("StudentInformations").findOne(query , function (err, result) {
            if (err) throw err;
            console.log(result);
            res.render('pages/studentdetail', { detail : result });
            db.close();
        });
    });
});
//Update a students
app.get("/update/:sid", function (req, res) {
    var pid = req.params.sid;
    //Get the class detail from mongodb
    MongoClient.connect(url, options, function (err, db) {
        if (err) throw err;
        var dbo = db.db("students");
        var query = {
            StudentID : sid
        };
        dbo.collection("StudentInformations").findOne(query , function (err, result) {
            if (err) throw err;
            console.log(result);
            res.render('pages/update', { detail : result });
            db.close();
        });
    });
});

//Delete a students
app.get("/delete/:sid", function (req, res) {
    var pid = req.params.sid;
    //Get the class detail from mongodb
    MongoClient.connect(url, options, function (err, db) {
        if (err) throw err;
        var dbo = db.db("students");
        var query = {
            StudentID : sid
        };
        dbo.collection("StudentInformations").findOne(query , function (err, result) {
            if (err) throw err;
            console.log(result);
            res.render('pages/student', { detail : result });
            db.close();
        });
    });
});





app.listen(8080);
console.log('Express started at http://localhost:8080');
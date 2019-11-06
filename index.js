var express = require('express');
var app = express();
// var data = require("./StudentInformations.json");

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var options = { useUnifiedTopology: true, useNewUrlParser: true };
var bodyPaser = require('body-parser');
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: true }));

// set the view engine to ejs
app.set('view engine', 'ejs');

//Home
app.get("/", function(req, res) {
    res.render('pages/Home');
});

app.get('/student/add', function(req, res) {
    res.render('pages/studentadd');
});


app.get('/student', function(req, res) {
    MongoClient.connect(url, options, function(err, db) {
        if (err) throw err;
        var dbo = db.db("students");
        var query = {};
        dbo.collection("StudentInformations").find(query).toArray(function(err, result) {
            if (err) throw err;
            //console.log(result);
            res.render('pages/student', { student: result });
            db.close();
        });
    });
});


app.get("/student/detail/:sid", function(req, res) {
    var pid = req.params.sid;
    //Get the class detail from mongodb
    MongoClient.connect(url, options, function(err, db) {
        if (err) throw err;
        var dbo = db.db("students");
        var query = {
            StudentID: sid
        };
        dbo.collection("StudentInformations").findOne(query, function(err, result) {
            if (err) throw err;
            console.log(result);
            res.render('pages/studentdetail', { detail: result });
            db.close();
        });
    });
});

app.get("/student/edit/:sid", function(req, res) {
    var pid = req.params.sid;
    //Get the class detail from mongodb
    MongoClient.connect(url, options, function(err, db) {
        if (err) throw err;
        var dbo = db.db("students");
        var query = {
            StudentID: sid
        };
        dbo.collection("StudentInformations").findOne(query, function(err, result) {
            if (err) throw err;
            console.log(result);
            res.render('pages/studentedit', { detail: result });
            db.close();
        });
    });
});

app.post('/studentsave', function(req, res) {
    var sID = req.body.sid;
    var sName = req.body.name;
    var sMajor = req.body.major;
    var sFac = req.body.faculty;
    var sSub = req.body.subject;

    MongoClient.connect(url, options, function(err, db) {
        if (err) throw err;
        var dbo = db.db("students");
        var query = {
            sid: sID
        }
        var newvalues = {
            $set: {
                name: sName,
                major: sMajor,
                faculty: sFac,
                subject: sSub,

            }
        };
        dbo.collection('StudentInformations')
            .updateOne(query, newvalues, function(err, result) {
                if (err) throw err;
                console.log("1 doc updated");
                db.close();
                res.redirect("/student");
            });
    });
});

app.post('/studentadd', function(req, res) {
    var sID = req.body.sid;
    var sName = req.body.name;
    var sMajor = req.body.major;
    var sFac = req.body.faculty;
    var sSub = req.body.subject;
    MongoClient.connect(url, options, function(err, db) {
        if (err) throw err;
        var dbo = db.db("students");
        var query = {};
        var newClass = {
            sid: sID,
            name: sName,
            major: sMajor,
            faculty: sFac,
            subject: sSub
        };
        dbo.collection("StudentInformations")
            .insertOne(newClass, function(err, result) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
                res.redirect("/student");
            });
    });
});



app.get("/student/delete/:sid", function(req, res) {
    var pid = req.params.sid;
    //Get the class detail from mongodb
    MongoClient.connect(url, options, function(err, db) {
        if (err) throw err;
        var dbo = db.db("students");
        var myquery = {
            StudentID: sid
        };
        dbo.collection("StudentInformations").findOne(myquery, function(err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            res.redirect("/student");
            db.close();
        });
    });
});

app.listen(8080);
console.log('Express started at http://localhost:8080');
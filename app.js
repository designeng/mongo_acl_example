var express = require("express");
var mongodb = require("mongodb");
var Acl = require("acl");

var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/mongo_acl';

MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to', url);

        var acl = new Acl(new Acl.mongodbBackend(db));
        acl.allow('member', 'blogs', ['edit','view', 'delete']);
    }
});

var app = module.exports = express();

if (!module.parent) {
    app.listen(3000);
    console.log('Express started on port 3000');
}
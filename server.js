const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;




app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




//Connection URL
const url = 'mongodb://localhost:27017';

//Database Name
const dbName = 'web-diary';


// Use connect method to connect to the server
MongoClient.connect(url, {
    useNewUrlParser: true
}, function (err, client) {
    assert.equal(null, err);

    const db = client.db(dbName);
    const entryCollection = db.collection("entries");

    //Get all entries
    const getEntries = (callback) => {
        entryCollection.find({}).toArray((err, result) => {
            if(err) throw err;
            if (result && typeof callback === "function") callback(result);
        });
    };

    //Insert Single Entry
    const insertEntry = (entry, callback) => {
        entryCollection.insertOne(entry, (err, result) => {
            if (err) throw err;
            if (result && typeof callback === "function") callback(entry);
        });
    };

    //Delete Entry by _ID
    const deleteEntry = (_id, callback) => {
        entryCollection.deleteOne({_id}, (err, result) => {
            if (err) throw err;
            if (result && typeof callback === "function") callback(result);
        })
    };

    //Delete All Entries
    const deleteAllEntries = (callback) => {
        entryCollection.deleteMany({}, (err, result) => {
            if (err) throw err;
            if (result && typeof callback === "function") callback(result);
        })
    };


    app.use('/', express.static('public'));

    app.get('/entries/clear', (req, res) => {
        deleteAllEntries(result => {
            res.json(result);
        });
    })

    app.get('/entries', (req, res) => {
        getEntries(result => res.json(result));
    });


    app.post('/entries/new', (req, res) => {
        insertEntry(req.body, result => res.json(result));
    });


    app.listen(port, () => console.log(`Server started on localhost:${port}`));
});
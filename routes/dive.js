var MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    db;

var mongoClient = new MongoClient(new Server('EMMMBP', 27017));
mongoClient.open(function(err, mongoClient) {
    db = mongoClient.db("DiveAnalyzer");
    db.collection('Dive', {strict:true}, function(err, collection) {
        if (err) {
            console.log("The 'Dive' collection doesn't exist.");
        }
    });
});

 exports.findById = function(req, res) {
    console.log(req.params);
    var id = parseInt(req.params.id);
    
    console.log('findById: ' + id);
    
    db.collection('Dive', function(err, collection) {
        collection.findOne({'id': id}, function(err, item) {
            res.jsonp(item);
        });
    });
};

/*exports.findByManager = function(req, res) {
    var id = parseInt(req.params.id);
    console.log('findByManager: ' + id);
    db.collection('Dive', function(err, collection) {
        collection.find({'managerId': id}).toArray(function(err, items) {
            console.log(items);
            res.jsonp(items);
        });
    });
};*/

exports.findAll = function(req, res) {
    var name = req.query["name"];
    db.collection('Dive', function(err, collection) {
        if (name) {
            collection.find({"fullName": new RegExp(name, "i")}).toArray(function(err, items) {
                res.jsonp(items);
            });
        } else {
            collection.find().toArray(function(err, items) {
                res.jsonp(items);
            });
        }
    });
};
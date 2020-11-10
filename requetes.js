Requete 1 :
db.runCommand( { count: users} )

Requete 2:
db.runCommand( { count: movies} )

Requete 3:
db.users.find( { name: 'Clifford Johnathan'}, { occupation: 1, name: 1 } )

Requete 4:
db.users.find({ age: { $gte: 18, $lt: 30 } }).count();

Requete 5:
db.users.find({ occupation: { $in: ['scientist','artist'] } }).count();

Requete 6:
db.users.find( { gender: 'F', occupation: 'writer' }, {occupation:1, name:1, age:1} ).limit(10).sort({ age: -1 })

Requete 7:
db.users.distinct( 'occupation' )

Requete 8:
db.users.insert( { name: "Brian", gender: 'M', age: 27, occupation: 'WebDev' } )

Requete 9:
db.users.update({name: "Brian"}, {$set: { movies: {movieid: 1419, rating: 4, timestamp: Math.round(new Date().getTime() / 1000) } } } )

Requete 10:
db.users.remove( { name: 'Brian' }, true )

Requete 11:
db.users.updateMany({occupation: 'programmer'}, {$set: { occupation: 'developper' } } )

Requete 12:
db.movies.find(
    { title: { $regex: /198.*/ } }
).count()

Requete 13:
db.movies.find(
    { genres: { $regex: /Horror/, $options:'i'}}
).count()

Requete 14:
db.movies.find({ $or: [ { title: { $regex: /(198[4-9])/i } }, { title: { $regex: /(199[0-2])/i } } ] }).count()

Requete 15:
db.movies.find({ $and: [ { genres: { $regex: /Musical/} }, { title: { $regex: /Romance/} } ] }).count()

Requete 16:
var t = db.movies.find();
t.forEach(function(fields){
    var ancienYear = fields.title.slice(fields.title.length - 6);
    var ancienTitle = fields.title.substring(0, fields.title.length - 7);
    var value= ancienYear.match(/\((.*)\)/).pop();
    db.movies.update({title: fields.title}, {$set: {title: ancienTitle, year: value}})
});

Requete 17:
var m = db.movies.find();
m.forEach(function(fields){
    var genre = fields.genres;
    var splited = genre.split("|");
    db.movies.update({genres: genre}, {$set: {genres: splited}})
});

Requete 18:
var d = db.users.find();
d.forEach(function(fields){
    fields.movies.forEach(function(items){
        var timestamp = items.timestamp;
        var date = new Date(timestamp * 1000);
        var newDate = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
        db.users.update({movies: {timestamp: timestamp}}, {$set: {movies: {timestamp: newDate} }})
    });
});
// BONNE REPONSE //
db.users.update(
    {},
    { $mul: {'movies.$[].timestamp' : 1000} },
    { multi: true }
)

Requete 19:
db.users.find({'movies.movieid': 1196 }, {name: 1}).count()

Requete 20:
db.users.find(
    {
        'movies.movieid': { $all: [1196, 260, 1210 ]}
    }).count()

Requete 21:
db.users.find({movies : { $size: 48 }}).count()

Requete 22:
db.users.find().forEach(function(users){
    var numRating = users.movies.length;
    db.users.update({name: users.name}, {$set: { num_rating: numRating }})
})

Requete 23:
db.users.find({num_rating: { $gt: 90}}).count()

Requete 24:
//db.users.find({'movies.timestamp' : { $gte:  (978307200 * 1000)}}).count()
db.users.aggregate([
    {
        $unwind: '$movies'
    },
    {
        $match: { 'movies.timestamp': { $gt : new Date('2001-01-01')} }
    },
    {
        $count : 'TotalCount'
    }
])

Requete 25:
db.users.find({name: 'Jayson Brad'}, {name:1, movies: {$slice: -3}}).sort({'movies.timestamp': -1})

Requete 26:
db.users.find({name: 'Tracy Edward'}, {occupation: 1, age:1, name:1, movies : {$elemMatch: {movieid: 1210}}})

Requete 27:
db.users.aggregate([
    { $unwind: "$movies" },
    { $match: { 'movies.rating': 5} },
    {
        $lookup: {
            "from": "movies",
            "localField": "movies.movieid",
            "foreignField": "_id",
            "as": "movie"
        }
    },
    { $match: { 'movie.title': "Untouchables, The"} },
    { $unwind: "$movie" },
    {
        $group: {
            "_id": "$movie._id",
            "count": { $sum: 1 }
        }
    },
    {
        $group: {
            "_id": null,
            "total": { $sum: "$count" }
        }
    }
])

Requete 28:
db.users.update(
    {name: "Barry Erin"},
    {
        $set: { movies:{
                movieid: 14,
                rating: 4,
                timestamp: 966715569000
            }},
        $setOnInsert: { $inc: {  "num_rating": 1 } }
    },
    { upsert: true }
)

Requete 34:
db.users.find({gender:"F"}, {name: 1}).sort({timestamp: -1}).limit(10).explain('executionStats')

Requete 35:
db.users.createIndex(
    { gender: 1, 'movies.timestamp': 1},
    { collation: { locale: "fr" } } )

Requete 36:
db.users.find({gender:"F"}, {name: 1}).sort({timestamp: -1}).limit(10).explain('executionStats')
// Vitesse de traitement plus rapide //

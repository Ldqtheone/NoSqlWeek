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
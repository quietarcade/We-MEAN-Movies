var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');
// var movies_data = require('../data/data_100.json');

var runGeoQuery = function (req, res) {
	var lng = parseFloat(req.query.lng);
	var lat = parseFloat(req.query.lat);
	var point = {
		type : "Point",
		coordinates : [lng, lat]
	};
	var geoOptions = {
		spherical : true,
		maxDistance : 10000,
		num : 5
	}
	Movie
	.geoNear(point, geoOptions,
		function (err, results, stats) {
		console.log("Geo stats", stats);
		res
		.status(200)
		.json(results);
	});
};

module.exports.moviesGetAll = function (req, res) {

	var number = 10;
	var maxNumber = 10;

	if (req.query && req.query.lng && req.query.lat) {
		runGeoQuery(req, res);
		return;
	}
	if (req.query && req.query.start) {
		start = parseInt(req.query.start);
	}
	if (req.query && req.query.number) {
		number = parseInt(req.query.number);
	}

	if (isNaN(number)) {
		res
		.status(400)
		.json({
			"message" : "If supplied in querystring, start and number must be numeric"
		});
		return;
	}

	if (number > maxNumber) {
		res
		.status(400)
		.json({
			"message" : "Max value for number is " + maxNumber
		});
		return;
	}
	
	Movie
	.find()
	.exec(function (err, docs) {
		if (err) {
			console.log("Error finding movies");
			res
			.status(500)
			.json(err)
		} else {
			console.log("Retrieved data for " + docs.length + " movies");
			res
			.status(200)
			.json(docs);
		}
	});
};

module.exports.moviesGetOne = function (req, res) {

	var movieID = req.params.movieID;
	console.log("GET movie " + movieID);
	Movie
	.findById(movieID)
	.exec(function (err, doc) {
		var response = {
			status : 200,
			message : doc
		}
		if (err) {
			response.status = 500;
			response.message = err
		} else if (!doc) {
			response.status = 404;
			response.message = {
				"message" : "Movie ID not found"
			};
		}
		res
		.status(response.status)
		.json(response.message);
	});
};

var splitArray = function (input) {
	var output;
	if (input && input.length > 0) {
		output = input.split(";");
	} else {
		output = [];
	}
	return output;
};

module.exports.moviesAddOne = function (req, res) {
	Movie
	.create({
		name : req.body.name,
		rating : parseInt(req.body.rating),
		city : req.body.city,
		review_count : 0,
		categories : splitArray(req.body.categories),
		reviews : [],
		location : {
			address : req.body.address,
			coordinates : [
				parseFloat(req.body.lng),
				parseFloat(req.body.lat)
			]
		}
	}, function (err, newMovie) {
		if (err) {
			console.log("Error creating movie");
			res
			.status(400)
			.json(err);
		} else {
			res
			.status(201)
			.json(newMovie);
		}
	});
};

module.exports.fixDatabase = function (req, res) {
	var db = dbConnect.get();
	var collection = db.collection('movie');
	collection
	.find()
	.toArray(function (err, docs) {
		for (var i = 0; i < docs.length; i++) {
			movie = docs[i];
			_id = movie._id;
			full_address = movie.full_address;
			longitude = movie.longitude;
			latitude = movie.latitude;
			collection.updateOne({
				"_id" : _id
			}, {
				$set : {
					"location" : {
						"address" : full_address,
						"coordinates" : [
							longitude, latitude
						]
					}
				}
			});
		}
		res
		.status(200)
		.json({
			"Message" : "Database updated"
		});
	})
};

module.exports.moviesUpdateOne = function (req, res) {
	var movieID = req.params.movieID;
	console.log("GET movie " + movieID);
	Movie
	.findById(movieID)
	.select("-reviews")
	.exec(function (err, doc) {
		var response = {
			status : 200,
			message : doc
		}
		if (err) {
			console.log("Error finding movie")
			response.status = 500;
			response.message = err;
		} else if (!doc) {
			response.status = 404;
			response.message = {
				"message" : "Movie ID not found"
			};
		}
		console.log("Found movie " + movieID);
		if (response.status != 200) {
			res
			.status(response.status)
			.json(response.message);
		} else {
			doc.name = req.body.name;
			doc.rating = parseInt(req.body.rating);
			doc.city = req.body.city;
			doc.categories =
				splitArray(req.body.categories);
			doc.location = {
				address : req.body.address,
				coordinates : [
					parseFloat(req.body.lng),
					parseFloat(req.body.lat)
				]
			};
			doc.save(function (err, updatedMovie) {
				if (err) {
					res
					.status(500)
					.json(err);
				} else {
					res
					.status(204)
					.json();
				}
			});
		}
	});
}

module.exports.moviesDeleteOne = function (req, res) {
	var movieID = req.params.movieID;
	Movie
	.findByIdAndRemove(movieID)
	.exec(function (err, thisMovie) {
		if (err) {
			res
			.status(404)
			.json(err);
		} else {
			console.log("Movie " + movieID
				 + " deleted");
			res
			.status(204)
			.json();
		}
	})
}

module.exports.checkReviews = function(req, res){
	var db = dbConnect.get();
	var collection = db.collection('movie');

	collection
	   .find()
	   .toArray(function(err, docs){
		   response = [];
		   for (var i = 0; i <docs.length; i++){
			   if(docs[i].review_count != docs[i].reviews.length){
				   response.push({
					   '_id' : docs[i]._id,
					   'review_count' : docs[i].review_count,
					   'actual_reviews' : docs[i].reviews.length
				   })
			   }
		   }
		   res
			   .status(200)
			   .json(response);
	   })
}

module.exports.fixReviews = function (req, res) {
	var db = dbConnect.get();
	var collection = db.collection('movie');

	collection
		.find()
		.toArray(function(err, docs) {
			response = [];
			for (var i = 0; i <docs.length; i++){
				if (docs[i].review_count != docs[i].reviews.length){
				collection.update (
					{"id" : docs[i]._id},
				    { $set : {
						"review_count" : docs[i].review.length
					}
                             
				    });
			}
		}
		res
			 .status(200)
			 .json( {"Message" : "Database updated"})
	})
}
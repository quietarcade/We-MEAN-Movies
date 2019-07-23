var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');

module.exports.reviewsGetAll = function (req, res) {
	var movieID = req.params.movieID;
	console.log("GET reviews for movie  " + movieID);

	Movie
	.findById(movieID)
	.select("reviews")
	.exec(function (err, doc) {
		var response = {
			status : 200,
			message : []
		};
		if (err) {
			console.log("Error finding movie " + movieID);
			response.status = 500;
			response.message = err;
		} else if (!doc) {
			console.log("Error finding movie " + movieID);
			response.status = 404;
			response.message = {
				"message" : "Movie ID not found"
			};
		} else {
			response.message = doc.reviews ? doc.reviews : [];
		}
		console.log("Found movie " + movieID);
		res
		.status(response.status)
		.json(response.message);
	});
};

module.exports.reviewsGetOne = function (req, res) {
	var movieID = req.params.movieID;
	var reviewID = req.params.reviewID;
	console.log("GET reviewID " + reviewID);
	Movie
	.findById(movieID)
	.select("reviews")
	.exec(function (err, doc) {
		var review = doc.reviews.id(reviewID);
		res
		.status(200)
		.json(review);
	});
}

var addReview = function (req, res, thisMovie) {
	thisMovie.reviews.push({
		username : req.body.username,
		votes : {
			"funny" : 0,
			"useful" : 0,
			"cool" : 0
		},
		text : req.body.text,
		rating : parseInt(req.body.rating)
	});
	thisMovie.save(function (err, updatedMovie) {
		if (err) {
			res
			.status(500)
			.json(err);
		} else {
			var newReviewPosition =
			updatedMovie.reviews.length - 1;
		var newReview =
			updatedMovie.reviews[newReviewPosition];
			res
			.status(201)
			.json(newReview);
		};
	});
}

module.exports.reviewsAddOne = function (req, res) {
	var movieID = req.params.movieID;
	console.log("GET reviews for movie " +
		movieID);
	Movie
	.findById(movieID)
	.select("reviews")
	.exec(function (err, doc) {
		var response = {
			status : 200,
			message : []
		};
		if (err) {
			console.log("Error finding movie");
			response.status = 500;
			response.message = err;
		} else if (!doc) {
			response.status = 404;
			response.message = {
				"message" : "Movie ID not found" +
				movieID
			};
		};
		if (doc) {
			addReview(req, res, doc);
		} else {
			res
			.status(response.status)
			.json(response.message);
		}
	});
}

module.exports.reviewsUpdateOne = function (req, res) {
	var movieID = req.params.movieID;
	var reviewID = req.params.reviewID;
	console.log('PUT reviewID ' + reviewID +
		' for movieID ' + movieID);
	Movie
	.findById(movieID)
	.select('reviews')
	.exec(function (err, thisMovie) {
		var thisReview;
		var response = {
			status : 200,
			message : {}
		};
		if (err) {
			console.log("Error finding movie");
			response.status = 500;
			response.message = err;
		} else if (!thisMovie) {
			console.log("Movie ID not found", id);
			response.status = 404;
			response.message = {
				"message" : "Movie ID not found " + id
			};
		} else {
			// get review and edit
			thisReview = thisMovie.reviews.id(reviewID);
			if (!thisReview) {
				response.status = 404;
				response.message = {
					"message" : "Review ID not found " + reviewId
				};
			}
		}

		// now check for an error and save

		if (response.status !== 200) {
			res
			.status(response.status)
			.json(response.message);
		} else {
			thisReview.username = req.body.username;
			thisReview.text = req.body.text;
			thisReview.rating = parseInt(req.body.rating);
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

module.exports.reviewsDeleteOne = function (req, res) {

	var movieID = req.params.movieID;
	var reviewID = req.params.reviewID;
	console.log('PUT reviewID ' + reviewID +
		' for movieID ' + movieID);
	Movie
	.findById(movieID)
	.select('reviews')
	.exec(function (err, thisMovie) {
		var thisReview;
		var response = {
			status : 200,
			message : {}
		};
		if (err) {
			console.log("Error finding movie");
			response.status = 500;
			response.message = err;
		} else if (!thisMovie) {
			console.log("Movie ID not found", id);
			response.status = 404;
			response.message = {
				"message" : "Movie ID not found " + id
			};
		} else {
			// get review and edit
			thisReview = thisMovie.reviews.id(reviewID);
			if (!thisReview) {
				response.status = 404;
				response.message = {
					"message" : "Review ID not found " + reviewId
				};
			}
		}

		// now check for an error and save
		if (response.status !== 200) {
			udeny
			res
			.status(response.status)
			.json(response.message);
		} else {
			doc.reviews.id(reviewID).remove();
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

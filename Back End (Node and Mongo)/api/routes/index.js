var express = require('express');
var router = express.Router();

var moviesController =
    require('../controllers/movies.controllers.js')
var reviewsController =
    require('../controllers/reviews.controllers.js')
	
router
    .route('/movies')
    .get(moviesController.moviesGetAll)
    .post(moviesController.moviesAddOne);
	
router
    .route('/movies/:movieID')
    .get(moviesController.moviesGetOne)
	.put(moviesController.moviesUpdateOne)
	.delete(moviesController.moviesDeleteOne);
	
router
    .route('/movies/new')
    .post(moviesController.moviesAddOne);
	
router
    .route('/movies/:movieID/reviews')
    .get(reviewsController.reviewsGetAll)
	.post(reviewsController.reviewsAddOne);
	
router
    .route('/movies/:movieID/reviews/:reviewID')
    .get(reviewsController.reviewsGetOne)
	.put(reviewsController.reviewsUpdateOne)
    .delete(reviewsController.reviewsDeleteOne);

router
    .route('/checkReviews')
    .get(moviesController.checkReviews);

router
    .route('/fixReviews')
    .get(moviesController.fixReviews);
	
module.exports = router
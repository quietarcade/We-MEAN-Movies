var mongoose = require('mongoose');

var votesSchema = new mongoose.Schema({
    Cinematography: Number,
    Narative: Number,
    Acting: Number
})

var reviewSchema = new mongoose.Schema({
    username : String,
    text : String,
    votes : votesSchema,
    rating : Number,
    date : {
        type : Date,
        default : Date.now
    }
});

var movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: Number,
    genres: [String],
    ratings: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
    },
    poster: String,
    contentRating: Number,
    duration: String,
    averageRating: Number,
    originalTitle: String,
    storyline: String,
    actors: [String],
    imdbRating: Number,
    posterurl: String,
    reviews: [reviewSchema]
});
mongoose.model('Movie', movieSchema, 'movie');
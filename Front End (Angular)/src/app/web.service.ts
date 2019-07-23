import {
	Http, URLSearchParams
}
	from '@angular/http';
import {
	Injectable
}
	from '@angular/core';

import {
	Subject
}
	from 'rxjs/Rx';

@Injectable()
export class WebService {

	private movie_private_list = [];
	private moviesSubject = new Subject();
	movie_list = this.moviesSubject.asObservable();

	private single_private_Movie = [];
	private movieSubject = new Subject();
	singleMovie = this.movieSubject.asObservable();

	private reviews_private_list = [];
	private reviewsSubject = new Subject();
	reviews = this.reviewsSubject.asObservable();

	movieID;

	constructor(private http: Http) { }

  getMovies() {
	 return this.http.get('http://localhost:3000/api/movies').subscribe(response => {
		this.movie_private_list = response.json();
		this.moviesSubject.next(this.movie_private_list);
	 })
  }

	getMovie(id) {
		console.log(id);
		return this.http.get(
			'http://localhost:3000/api/movies/' + id).subscribe(response => {
				this.single_private_Movie = [];
				this.single_private_Movie.push(response.json());
				this.movieSubject.next(this.single_private_Movie);
				this.movieID = id;
			});
	}

	getReviews(id) {
		this.http.get('http://localhost:3000/api/movies/' + id + '/reviews').subscribe(response => {
			this.reviews_private_list = response.json();
			this.reviewsSubject.next(this.reviews_private_list);
		})
	}

	postReview(review) {
		let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('username', review.name);
		urlSearchParams.append('text', review.review);
		urlSearchParams.append('rating', review.rating);

		this.http.post("http://localhost:3000/api/movies/" + review.movieID + "/reviews", urlSearchParams).subscribe(response => {

			this.getReviews(review.movieID);
		}
		)
	}
}


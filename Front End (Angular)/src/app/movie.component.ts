import { Component } from '@angular/core';
import { WebService } from './web.service';
import { AuthService } from './auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'movie',
	templateUrl: './movie.component.html',
	styleUrls: ['./movie.component.css']
})
export class MovieComponent {

	reviewForm;

	review = {
		movieID: '',
		name: '',
		review: '',
		rating: 5
	}

	constructor(private webService: WebService,
		private route: ActivatedRoute, private formBuilder: FormBuilder, private auth: AuthService) {

		this.reviewForm = formBuilder.group({
			name: ['', Validators.required],
			review: ['', Validators.required],
			rating: 3
		});
	}

	isInvalid(control) {
		return this.reviewForm.controls[control].invalid && this.reviewForm.controls[control].touched;
	}

	isIncomplete() {
		return this.isInvalid('name') || this.isInvalid('review');
		}

	ngOnInit() {
		this.webService.getMovie(this.route.snapshot.params.id);
		this.webService.getReviews(this.route.snapshot.params.id);
	}

	onSubmit() {
		this.review.movieID = this.webService.movieID;
		console.log(this.review);
		this.webService.postReview(this.review);
        this.reviewForm.reset();
	}
	movie;
}
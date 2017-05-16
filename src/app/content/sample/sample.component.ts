import { Component, OnInit } from '@angular/core';
import { Form, FormGroup,
 FormControl, FormBuilder, Validators} from '@angular/forms';

import { Sample } from '../../models/general/sample.model';
import { SampleService } from '../../services/sample.service';


@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {

	private sampleForm: FormGroup;

  constructor(private fb: FormBuilder,
  		private sampleService: SampleService) {

  	this.sampleForm = fb.group({
  		sample: new FormControl("", Validators.compose(
  			[Validators.required, sampleValidator]))
  	});
  	
  }

  ngOnInit() {

  }

  onSubmit(event: Event): void {
  	event.preventDefault();
  	if (!this.sampleForm.valid)
			return;

	let strings: string[] = 
	this.sampleForm.controls["sample"].value
	.split(" ");

	let numbers: number[] = [];
	for (var str of strings) {
		numbers.push(+str);
	}

	if (numbers) {
		this.sampleService.addSample(new Sample(numbers));
	}
  }

}

/**
 * Validator for the sample string
 * @param {FormControl} control [description]
 */
function sampleValidator(control: FormControl): {[s: string]: boolean} {
	if (!control.value.match(/^\d(\s\d)*/g)){
		return {invalidSample: true};
	}
}

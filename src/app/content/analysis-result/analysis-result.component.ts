import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

import 'rxjs';
import { AnalysisService } 
	from './../../services/http/analysis-service.service';
import { Sample } from './../../models/general/sample.model';
import { PrimaryAnalysisResult } 
	from "./../../models/primary-analysis/primary-analysis.model";


@Component({
  selector: 'app-analysis-result',
  templateUrl: './analysis-result.component.html',
  styleUrls: ['./analysis-result.component.css']
})
export class AnalysisResultComponent implements OnInit {

	@Input()
	public sample: Sample = new Sample([
		1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);

	public analysisResult: PrimaryAnalysisResult 
		= new PrimaryAnalysisResult();

	public analyzeForm = this.fb.group({
		sample: new FormControl("", Validators.required)
 	 });

	constructor(private analysisService: AnalysisService,
		public fb: FormBuilder) {

	}

	doAnalyze(event) {
		let strings: string[] = 
		this.analyzeForm.controls["sample"].value
		.split(" ");
		console.dir(strings);

		let numbers: number[] = [];
		for (var str of strings) {
			numbers.push(+str);
		}

		if (numbers) {
			this.sample = new Sample(numbers);
		}

		console.dir(numbers);

		this.analysisService.getCoarsePrimaryAnalysis(
			this.sample).subscribe(
			(val: PrimaryAnalysisResult) => {
				this.analysisResult = val;
			});
	}

	ngOnInit() {
		this.analysisService.getCoarsePrimaryAnalysis(
			this.sample).subscribe(
			(val: PrimaryAnalysisResult) => {
				this.analysisResult = val;
			});
	}

}

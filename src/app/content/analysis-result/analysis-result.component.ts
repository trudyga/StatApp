import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Sample } from './../../models/general/sample.model';
import { PrimaryAnalysisResult } 
	from "./../../models/primary-analysis/primary-analysis.model";

import { SampleService } from './../../services/sample.service';
import { PrimaryAnalysisResultService } from 
	'./../../services/primary-analysis.service';

@Component({
  selector: 'app-analysis-result',
  templateUrl: './analysis-result.component.html',
  styleUrls: ['./analysis-result.component.css']
})
export class AnalysisResultComponent implements OnInit {

	@Input()
	public sample: Sample;

	public analysisResult: PrimaryAnalysisResult = 
		new PrimaryAnalysisResult();
	public coarseAnalysisResult: PrimaryAnalysisResult = 
		new PrimaryAnalysisResult();

	private precision: number = 6;

	constructor(private sampleService: SampleService,
		private primaryAnalysisResultService: PrimaryAnalysisResultService,
		public fb: FormBuilder) {
		this.sampleService.addSample(new Sample([
			1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]));

		this.primaryAnalysisResultService
		.coarseAnalysisResultStream.map(val => {
			return this.toPrecision(val);
		}).subscribe((val) => {
			this.coarseAnalysisResult = val;
		}, (error) => console.error(
			"Error when retrieving analysis result: " + error));
	
		this.primaryAnalysisResultService
		.analysisResultStream.map(val => {
			return this.toPrecision(val);
		}).subscribe((val) => {
			this.analysisResult = val;
		}, (error) => console.error(
			"Error when retrieving analysis result: " + error));
	}

	ngOnInit() {
			
	}

	/**
	 * Transfrom items in primaryAnalysisResult with given Presition
	 * @param  {PrimaryAnalysisResult} result Primary analysis object to change precision
	 * @return {PrimaryAnalysisResult}        Primary analysis object with changed precision
	 */
	private toPrecision(val: PrimaryAnalysisResult): PrimaryAnalysisResult {
			let result = new PrimaryAnalysisResult();
			for (let key in val) {
				result[key] = (+val[key]).toPrecision(this.precision)
			}
			return result;
	}

}


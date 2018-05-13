import { Injectable, Inject } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

import {PrimaryAnalysisResult} 
	from '../models/primary-analysis/primary-analysis.model';
import {Sample} from '../models/general/sample.model';
import {SampleService} from './sample.service';
import {AnalysisHTTPService} from './http/analysis-service.service';

@Injectable()
export class PrimaryAnalysisResultService {
	public coarseAnalysisResultStream: Observable<PrimaryAnalysisResult>;
	public analysisResultStream: Observable<PrimaryAnalysisResult>;

	constructor(private analysisHttpService: AnalysisHTTPService,
		private sampleService: SampleService) {
		this.coarseAnalysisResultStream = sampleService.sampleStream
			.mergeMap(sample => analysisHttpService.getCoarsePrimaryAnalysis(sample));

		this.analysisResultStream = sampleService.sampleStream
			.mergeMap(sample => analysisHttpService.getPrimaryAnalysis(sample));	
	}
}
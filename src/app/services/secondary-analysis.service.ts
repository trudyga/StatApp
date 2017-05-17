import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {AnalysisHTTPService} from './http/analysis-service.service';
import {SampleService} from './sample.service';

import {SamplePair} from './../models/general/sample-pair.model';
import {SecondaryAnalysisResult} from './../models/secondary-analysis/secondary-analysis.model';
import {LinearFunction} from './../models/secondary-analysis/linear-function.model';

@Injectable()
export class SecondaryAnalysisResultService {
	public secondaryAnalysisResultStream: Observable<SecondaryAnalysisResult>;
	public lineSteam: Observable<LinearFunction>;

	constructor(private analysisHttpService: AnalysisHTTPService,
		private sampleService: SampleService) {

		this.lineSteam = sampleService.samplePairStream
			.mergeMap(pair => 
				analysisHttpService.getLinearFunction(pair));

		this.secondaryAnalysisResultStream = sampleService.samplePairStream
			.mergeMap(pair => 
				analysisHttpService.getCorelation(pair));

	}
}
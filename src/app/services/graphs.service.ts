import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {AnalysisHTTPService} from './http/analysis-service.service';
import {SampleService} from './sample.service';

import {GistogramData} from './../models/graphs/gistogram-data.model';

@Injectable()
export class GraphsService {
	public gistogramStream: Observable<GistogramData>;

	constructor(private analysisHttpService: AnalysisHTTPService,
		private sampleService: SampleService) {
		this.gistogramStream = sampleService.sampleStream
			.mergeMap(sample => 
				analysisHttpService.getGistogramData(sample));
	}
}

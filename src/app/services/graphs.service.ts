import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {AnalysisHTTPService} from './http/analysis-service.service';
import {SampleService} from './sample.service';

import {GistogramData} from './../models/graphs/gistogram-data.model';
import {SamplePair} from './../models/general/sample-pair.model';

@Injectable()
export class GraphsService {
	public gistogramStream: Observable<GistogramData>;
	public bubbleStream: Observable<SamplePair>;

	constructor(private analysisHttpService: AnalysisHTTPService,
		private sampleService: SampleService) {
		this.gistogramStream = sampleService.sampleStream
			.mergeMap(sample => 
				analysisHttpService.getGistogramData(sample));

		this.bubbleStream = sampleService.samplePairStream;
	}
}

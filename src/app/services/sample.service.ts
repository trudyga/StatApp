import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

import {Sample} from '../models/general/sample.model';
import { SamplePair } from '../models/general/sample-pair.model';

@Injectable()
export class SampleService {
	public sampleStream: Subject<Sample>;
	public samplePairStream: Subject<SamplePair>;

	constructor() {
		this.sampleStream = new Subject<Sample>();
		this.samplePairStream = new Subject<SamplePair>();
	}

	public addSample(sample: Sample): void {
		if (sample) {
			this.sampleStream.next(sample);
		}
	}

	public addSamplePair(samplePair: SamplePair): void {
		if (samplePair) {
			this.samplePairStream.next(samplePair);
		}
	}
}
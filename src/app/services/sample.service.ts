import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

import {Sample} from '../models/general/sample.model';

@Injectable()
export class SampleService {
	public sampleStream: Subject<Sample>;

	constructor() {
		this.sampleStream = new Subject<Sample>();
	}

	public addSample(sample: Sample): void {
		if (sample) {
			this.sampleStream.next(sample);
		}
	}
}
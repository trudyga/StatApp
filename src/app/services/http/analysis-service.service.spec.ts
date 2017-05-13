import { AnalysisService } from './analysis-service.service';
import { Http, HttpModule } from '@angular/http';
import 'rxjs';
// Import models
import {Sample} from './../../models/general/sample.model';
import { GistogramData } 
	from './../../models/graphs/gistogram-data.model';
import { Range } 
	from './../../models/graphs/range.model';
import { PrimaryAnalysisResult } 
	from './../../models/primary-analysis/primary-analysis.model';
import { SecondaryAnalysisResult }
	from './../../models/secondary-analysis/secondary-analysis.model';

import { TestBed } from '@angular/core/testing';


describe('AnalysisService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpModule],
			providers: [
				{provide: "API_URL", useValue: "http://localhost:8080/api/"},
				AnalysisService
			]
		});
	});

	it('should test', () => {
		let sample: Sample = new Sample(
			[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

		let service = new AnalysisService();

		service.getCoarsePrimaryAnalysis(sample)
			.subscribe((res: PrimaryAnalysisResult) => {
				console.log("Mathematical expectation" + 
					res.mathExpectation);
			});
	});
});
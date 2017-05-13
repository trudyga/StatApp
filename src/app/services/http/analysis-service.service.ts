import { Injectable, Inject } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs';

//Import RxJs required methods
import 'rxjs';

// Import models
import { Sample } from './../../models/general/sample.model';
import { GistogramData } 
	from './../../models/graphs/gistogram-data.model';
import { Range } 
	from './../../models/graphs/range.model';
import { PrimaryAnalysisResult } 
	from './../../models/primary-analysis/primary-analysis.model';
import { SecondaryAnalysisResult }
	from './../../models/secondary-analysis/secondary-analysis.model';

@Injectable()
export class AnalysisService {

	apiUrl: string;

	constructor(private http: Http, @Inject("API_URL")
		apiUrl: string) {
		 this.apiUrl = apiUrl;
	}

	public getCoarsePrimaryAnalysis(sample: Sample): 
		Observable<PrimaryAnalysisResult> {
		return this.postData(sample, "primaryAnalysis")
			.map(val => {
				let res = val.AnalysisResult;

				return new PrimaryAnalysisResult(
				{
					mathExpectation: res.MathExpectation,
					dispersion: res.Dispersion,
					squareRootDeviation: res.StandartDeviation,
					assymetryFactor: res.AssymetryFactor,
					exessentialFactor: res.ExessentialFactor
				});
			});
	}

	public getPrimaryAnalysis(sample: Sample): 
		Observable<PrimaryAnalysisResult> {
		return null;
	}

	public getCoarseMarkedValues(sample: Sample): 
	Observable<{[key: string]: number}> {
		return null;
	}

	public getGistogramData(sample: Sample):
		Observable<GistogramData> {
		return null;
	}

	private postData(sample: Sample, url: string): Observable<any> {
		const body = JSON.stringify(sample.data);
		let headers = new Headers({
			'Content-Type': 'application/json;charset=utf-8'
		});

		let fullUrl = this.apiUrl + url;

		return this.http.post(fullUrl, body, {headers : headers})
		.map((res: Response) => res.json())
		.catch((error: any) => {return Observable.throw(error);});
	}
}
import { Component, OnInit } from '@angular/core';

import 'rxjs';
import { LinearFunction } from './../../../models/secondary-analysis/linear-function.model';
import { SecondaryAnalysisResult } from './../../../models/secondary-analysis/secondary-analysis.model';

import { SecondaryAnalysisResultService } from './../../../services/secondary-analysis.service';

@Component({
  selector: 'app-secondary-analysis-result',
  templateUrl: './secondary-analysis-result.component.html',
  styleUrls: ['./secondary-analysis-result.component.css']
})
export class SecondaryAnalysisResultComponent implements OnInit {
	public regresionFunc: string;
	public corelation: string;

  constructor(private secondaryAnalysisService: SecondaryAnalysisResultService ) {
  	
  }

  ngOnInit() {
  	this.secondaryAnalysisService.lineSteam.subscribe(func => {
  		this.regresionFunc = "y = " + func.b1.toPrecision(5) + " " + func.b2.toPrecision(5) + " * x;";
  	});
  	
  	this.secondaryAnalysisService.secondaryAnalysisResultStream.subscribe(res => {
  		this.corelation = res.corelation.toPrecision(5);
  	});
  }

}

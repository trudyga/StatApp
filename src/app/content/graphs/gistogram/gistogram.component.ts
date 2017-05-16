import { Component, OnInit, 
	ViewChild, ElementRef } from '@angular/core';

import {Chart} from 'chart.js';

import {GistogramData} from '../../../models/graphs/gistogram-data.model';

import {GraphsService} from './../../../services/graphs.service';

@Component({
  selector: 'app-gistogram',
  templateUrl: './gistogram.component.html',
  styleUrls: ['./gistogram.component.css']
})
export class GistogramComponent implements OnInit {
	@ViewChild('gistogram') private gistogram: ElementRef;

	private ctx: any;
	private data: any;
	private options: any;
	private barChart: Chart;

	constructor(private graphsService: GraphsService) {

	}

	ngOnInit() {
		this.ctx = this.gistogram.nativeElement.getContext('2d');

		this.setUpGistogram();
		this.graphsService.gistogramStream.subscribe(
			data => {
				this.updateGistogram(data);
			});
	}

	private updateGistogram(gistogramData: GistogramData): void {
		let dataLabels: string[] = [];
		let datasetColors: string[] = [];
		let datasetBorderColors: string[] = [];
		let valuesData: number[] = [];

		let i = 0;
		for (let segment of gistogramData.classes) {
			dataLabels.push(segment.key.lower.toPrecision(5) + " - " + segment.key.upper.toPrecision(5));
			datasetColors.push(`rgba(${50*i%255}, ${255 - 45*i%255}, ${67*i%255}, 0.2)`);
			datasetBorderColors.push(`rgba(${50*i%255}, ${255 - 45*i%255}, ${67*i%255}, 1)`);
			valuesData.push(segment.value);
			i++;
		}
		// set up data for chart
		this.data = {
			labels: dataLabels,
		    datasets: [
		        {
		            label: "Gistogram of the sample data",
		            backgroundColor: datasetColors,
		            borderColor: datasetBorderColors,
		            borderWidth: 1,
		            data: valuesData
		        }
		    ]
		};

		if (!this.options) {
			this.setUpGistogram();
		}

		this.clearCanvas();
		
		// create chart instance
		this.barChart = new Chart(this.ctx, {
			type: 'bar',
			data: this.data,
			options: this.options
		});
	}

	private setUpGistogram(options?: any): void {
		if (options) {
			this.options = options;
			return;
		}

		this.options = {
	        scales: {
	            xAxes: [{
	                stacked: true
	            }],
	            yAxes: [{
	                stacked: true
	            }]
	        },
	        responsive: true
	    };
	}

	private clearCanvas(): void {
		this.ctx.clearRect(0,0, this.ctx.width, this.ctx.height);
	}
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import {  } from 'chart.js';

import { GraphsService } from '../../../services/graphs.service';
import { SamplePair } from '../../../models/general/sample-pair.model';
import { Sample } from '../../../models/general/sample.model';
import { LinearFunction } from '../../../models/secondary-analysis/linear-function.model';

@Component({
  selector: 'app-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.css']
})
export class BubbleComponent implements OnInit {

	@ViewChild('bubble') private bubble: ElementRef;
	@ViewChild('line') private line: ElementRef;

	private ctx: any;
	private data: any;
	private options: any;
	private bubbleChart: Chart;

	private lineCtx: any;
	private minX: number;
	private maxX: number;
	private xLabel: string;
	private yLabel: string;

	constructor(private graphsService: GraphsService) {

	}

	ngOnInit() {
		this.ctx = this.bubble.nativeElement.getContext('2d');
		this.lineCtx = this.line.nativeElement.getContext('2d');


		this.graphsService.bubbleStream.subscribe(
			data => {
				this.setUpBubble(data);
				this.updateBubble(data);
			});

		this.graphsService.lineStream.subscribe(
			func => {
				this.updateLinear(func)
			})
	}

	private updateLinear(linear?: LinearFunction) : void {
		console.log("MIN" + this.minX);
		console.log("Max" + this.maxX);

		var scatterChart = new Chart(this.lineCtx, {
			type: 'line',
			data: {
				datasets: [{
					label: 'Regression diagram',
					fill: false,
		            lineTension: 0.1,
		            backgroundColor: "rgba(75,192,192,0.4)",
		            borderColor: "rgba(75,192,192,1)",
		            borderCapStyle: 'butt',
		            borderDash: [],
		            borderDashOffset: 0.0,
		            borderJoinStyle: 'miter',
		            pointBorderColor: "rgba(75,192,192,1)",
		            pointBackgroundColor: "#fff",
		            pointBorderWidth: 1,
		            pointHoverRadius: 5,
		            pointHoverBackgroundColor: "rgba(75,192,192,1)",
		            pointHoverBorderColor: "rgba(220,220,220,1)",
		            pointHoverBorderWidth: 2,
		            pointRadius: 1,
		            pointHitRadius: 10,
					data: [{
						x: this.minX,
						y: linear.calc(this.minX)
					}, {
						x: this.maxX,
						y: linear.calc(this.maxX)
					}]
				}]
			},
			options: {
				scales: {
		            xAxes: [{
		                type: 'linear',
		                position: 'bottom',
		                scaleLabel: {
					        display: true,
					        labelString: this.xLabel
				      	}
		            }],
		            yAxes: [{
		            	scaleLabel: {
					        display: true,
					        labelString: this.yLabel
				      	}
		            }]
		        }
			}
		});
	}


	private updateBubble(samplePair: SamplePair): void {
		let valuesData: Array<{x: number, y: number, r: number}> = [];

		this.minX = samplePair.getNumberPair(0).x;
		this.maxX = this.minX;

		for (let i = 0; i < samplePair.getLength(); i++) {
			// get min x
			if (samplePair.getNumberPair(i).x < this.minX)
				this.minX = samplePair.getNumberPair(i).x;
			// get max x
			if (samplePair.getNumberPair(i).x > this.maxX)
				this.maxX = samplePair.getNumberPair(i).x;

			let dataItem = {
				x: samplePair.getNumberPair(i).x,
				y: samplePair.getNumberPair(i).y,
				r: 3
			};
			valuesData.push(dataItem);
		}

		// set up data for chart
		this.data = {
		    datasets: [
		        {
		            label: "Direct - indirect metrics",
		            backgroundColor:"#FF6384",
		            hoverBackgroundColor: "#FF6384",
		            data: valuesData
		        }
		    ]
		};

		if (!this.options) {
			this.setUpBubble(samplePair);
		}

		this.clearCanvas();
		
		// create chart instance
		this.bubbleChart = new Chart(this.ctx, {
			type: 'bubble',
			data: this.data,
			options: this.options
		});
	}

	private setUpBubble(samplePair ?: SamplePair): void {
		this.xLabel = samplePair.xName;
		this.yLabel = samplePair.yName;

		this.options = {
		        elements: {
		            points: {
		                borderWidth: 1,
		                borderColor: 'rgb(0, 0, 0)'
		            }
		        },
				scales: {
				    yAxes: [{
				      scaleLabel: {
				        display: true,
				        labelString: samplePair.yName
				      }
				    }],
				    xAxes: [{
				    	scaleLabel: {
				    		display: true,
				    		labelString: samplePair.xName
				    	}
				    }]
				}		        
		    };
	}

	private clearCanvas(): void {
		this.ctx.clearRect(0,0, this.ctx.width, this.ctx.height);
	}
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

import { GraphsService } from '../../../services/graphs.service';
import { SamplePair } from '../../../models/general/sample-pair.model';
import { Sample } from '../../../models/general/sample.model';

@Component({
  selector: 'app-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.css']
})
export class BubbleComponent implements OnInit {

	@ViewChild('bubble') private bubble: ElementRef;

	private ctx: any;
	private data: any;
	private options: any;
	private bubbleChart: Chart;

	constructor(private graphsService: GraphsService) {

	}

	ngOnInit() {
		this.ctx = this.bubble.nativeElement.getContext('2d');

		this.setUpGistogram();
		this.graphsService.bubbleStream.subscribe(
			data => {
				this.updateGistogram(data);
			});
	}


	private updateGistogram(samplePair: SamplePair): void {
		let valuesData: Array<{x: number, y: number, r: number}> = [];

		for (let i = 0; i < samplePair.getLength(); i++) {
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
		            label: "Gistogram of the sample data",
		            backgroundColor:"#FF6384",
		            hoverBackgroundColor: "#FF6384",
		            data: valuesData
		        }
		    ]
		};

		if (!this.options) {
			this.setUpGistogram();
		}

		this.clearCanvas();
		
		// create chart instance
		this.bubbleChart = new Chart(this.ctx, {
			type: 'bubble',
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
		        elements: {
		            points: {
		                borderWidth: 1,
		                borderColor: 'rgb(0, 0, 0)'
		            }
		        }
		    };
	}

	private clearCanvas(): void {
		this.ctx.clearRect(0,0, this.ctx.width, this.ctx.height);
	}
}

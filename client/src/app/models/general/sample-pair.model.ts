import { Sample } from './sample.model';

export class SamplePair {
	public x: Sample;
	public y: Sample;

	public xName: string;
	public yName: string;

	public constructor(x?: Sample, y?: Sample,
		xName ?: string, yName ?: string) {
		this.x = x || new Sample();
		this.y = y || new Sample();
		this.xName = xName;
		this.yName = yName;
	}

	/**
	 * Get pair of numbers correspoding to index
	 * @param {[type]} index pair {x: number, y: number}
	 */
	public getNumberPair(index): {x: number, y: number} {
		if (this.x.data && this.y.data 
			&& index < this.x.data.length && index < this.y.data.length) {
			return {
				x: this.x.data[index],
				y: this.y.data[index]
			}
		}
		return null;
	}

	/**
	 * Get the length of numbers in sample pair
	 * @return {number} length
	 */
	public getLength(): number {
		return Math.min(this.x.data.length, this.y.data.length);
	}
}
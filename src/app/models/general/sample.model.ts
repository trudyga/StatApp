/**
 * Represent sample numeric data for analysis
 */
export class Sample {
	public data: number[];
	public name: string;

	/**
	 * Recieves array of numbers as initial value
	 * or creates and empty sample
	 * @param {number[]} dataList array of numbers
	 */
	constructor(dataList?: number[], name?: string) {
		this.data = dataList || new Array<number>();
		this.name = name || "";
	}

	/**
	 * Add value to the end of the sample
	 * @param {number} value numeric value
	 */
	public add(value: number) {
		this.data.push(value);
	}
}
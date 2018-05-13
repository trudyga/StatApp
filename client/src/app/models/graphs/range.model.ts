export class Range {
	public lower: number;
	public upper: number;

	constructor(lower?: number,
		upper?: number) {
		this.lower = lower || 0;
		this.upper = lower && upper || 0;
	}
}
export class LinearFunction {

	public b1: number;
	public b2: number;

	public constructor(b1: any, b2: any) {
		this.b1 = b1;
		this.b2 = b2;
	}

	calc(x: number): number {
		return this.b1 + (this.b2*x);
	}
}
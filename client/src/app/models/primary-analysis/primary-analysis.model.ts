export class PrimaryAnalysisResult {
	public mathExpectation: number;
	public dispersion: number;
	public squareRootDeviation: number;
	public assymetryFactor: number;
	public exessentialFactor: number;
	public law: string;

	constructor(obj?: any) {
		this.mathExpectation	 	= obj && obj.mathExpectation 	 || 0;
		this.dispersion 			= obj && obj.dispersion 		 || 0;
		this.squareRootDeviation 	= obj && obj.squareRootDeviation || 0;
		this.assymetryFactor 		= obj && obj.assymetryFactor 	 || 0;
		this.exessentialFactor 		= obj && obj.exessentialFactor 	 || 0;
		if (Math.abs(this.assymetryFactor) >= 0.2 
			|| Math.abs(this.exessentialFactor) >= 0.2) {
			this.law = "Normal distribution";
		}
		else {
			this.law = "Abnormal distibution";
		}
	}
}
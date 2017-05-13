import { Range } from './range.model';

export class GistogramData {
	public classes: [{key: Range, value: number}]

	constructor(classes: [{key: Range, value: number}]) {
		this.classes = classes;
		
	}
}
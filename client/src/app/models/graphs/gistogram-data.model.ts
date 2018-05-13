import { Range } from './range.model';

export class GistogramData {
	public classes: [{key: Range, value: number}]
	public name: string;

	constructor(classes: [{key: Range, value: number}], name?: string) {
		this.classes = classes;
		this.name = name;
	}
}
import { MutableState } from "src/app/core/state/mutable-state.model";

export class RegularIncome implements MutableState<RegularIncome> {

	constructor(
		public name: String,
		public description: String,
		public income: Number) { }

		public clone = (): RegularIncome => new RegularIncome(this.name, this.description, this.income);
}	
/**
 * cnst-func to be able to instantiate an empty regularIncome.
 * Used in view.
*/
export const regularIncomeConst = (): RegularIncome => new RegularIncome('','',0);

export const regularIncomeByDataMap = (map: any): RegularIncome => {
	let newRegIncome: any = new RegularIncome('','',0);
	let keysOfRegIncome = Object.keys(newRegIncome);
	for(let propName of Object.keys(map)) {
		if (keysOfRegIncome.indexOf(propName) >= 0) {
			newRegIncome[propName] = map[propName];
		}
	}
	return newRegIncome;
}


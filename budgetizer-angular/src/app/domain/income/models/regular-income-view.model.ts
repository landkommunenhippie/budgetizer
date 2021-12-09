import { RegularIncome } from "src/app/core/models/states.model";

export class RegularIncomeViewModel implements RegularIncome {
	constructor(
		public name: string,
		public description: string,
		private _income: number) { }

	public set income(income: number) {
		this._income = income * 1;
	}
	public get income(): number {
		return this._income;
	}

	public static createBy =
		(regularIncome: RegularIncome): RegularIncomeViewModel => new RegularIncomeViewModel(regularIncome.name, regularIncome.description, regularIncome.income);

	public toRegularIncome(): RegularIncome {
		return {name: this.name, description: this.description, income: this._income};
	}
}	
/**
 * cnst-func to be able to instantiate an empty regularIncome.
 * Used in view.
*/
export const regularIncomeConst = (): RegularIncomeViewModel => new RegularIncomeViewModel('','',0);

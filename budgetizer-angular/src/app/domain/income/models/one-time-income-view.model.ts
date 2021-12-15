import { OneTimeIncome } from "src/app/core/models/states.model";

export class OneTimeIncomeViewModel implements OneTimeIncome {
	
	constructor(
		public name: string,
		public description: string,
		public date: Date,
		private _income: number) { }

	public set income(income: number) {
		this._income = income * 1;
	}
	public get income(): number {
		return this._income;
	}

	public static createBy = (oneTimeIncome: OneTimeIncome): OneTimeIncomeViewModel => new OneTimeIncomeViewModel(oneTimeIncome.name, oneTimeIncome.description, oneTimeIncome.date, oneTimeIncome.income); 

	public toOneTimeIncome(): OneTimeIncome {
		return {
			name: this.name,
			description: this.description,
			date: this.date,
			income: this.income
		};
	}
}

export const oneTimeIncomeCons = () : OneTimeIncomeViewModel => new OneTimeIncomeViewModel('', '', new Date(), 0);
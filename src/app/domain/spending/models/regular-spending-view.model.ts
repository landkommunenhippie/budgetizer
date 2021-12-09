import { RegularSpending } from "src/app/core/models/states.model";

export class RegularSpendingViewModel implements RegularSpending {

	constructor(
		public name: string,
		public description: string,
		private _spendingMonthly: number,
		private _spendingAnually: number
	) {}

	public get spendingMonthly(): number { return this._spendingMonthly; }
	public get spendingAnually(): number { return this._spendingAnually; }

	public set spendingMonthly(spendingMonthly: number) {
		this._spendingMonthly = spendingMonthly * 1;
		this._spendingAnually = spendingMonthly * 12;	
	}

	public set spendingAnually(spendingAnually: number) {
		this._spendingAnually = spendingAnually * 1;
		this._spendingMonthly = spendingAnually / 12;	
	}

	public static createBy =
		(regularSpending: RegularSpending): RegularSpendingViewModel => 
			new RegularSpendingViewModel(regularSpending.name, regularSpending.description, regularSpending.spendingMonthly, regularSpending.spendingAnually);

	public toRegularSpending(): RegularSpending {
		return { name: this.name, description: this.description, spendingMonthly: this._spendingMonthly, spendingAnually: this._spendingAnually };
	}
}

/**
 * cnst-func to be able to instantiate an empty regularIncome.
 * Used in view.
*/
export const regularSpendingConst = (): RegularSpendingViewModel => {
	return new RegularSpendingViewModel('', '', 0, 0) ;
}

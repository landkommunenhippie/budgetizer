import { RegularSpending } from "src/app/core/models/states.model";
import { EditableView } from "src/app/shared/models/editable-view.model";

export class RegularSpendingViewModel extends EditableView<RegularSpending,RegularSpendingViewModel> implements RegularSpending {
	
	constructor(
		public name: string,
		public description: string,
		private _spendingMonthly: number,
		private _spendingAnually: number,
		public monthly: boolean,
		public startDate: Date,
		public endDate?: Date
	) {
		super();
	}

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
			new RegularSpendingViewModel(regularSpending.name, regularSpending.description, regularSpending.spendingMonthly, regularSpending.spendingAnually, regularSpending.monthly, regularSpending.startDate, regularSpending.endDate);

	protected byInterface(dataOnly: RegularSpending): RegularSpendingViewModel {
		return RegularSpendingViewModel.createBy(dataOnly);
	}
	public toInterface(): RegularSpending {
		return { name: this.name, description: this.description, spendingMonthly: this._spendingMonthly, spendingAnually: this._spendingAnually, monthly: this.monthly, startDate: this.startDate, endDate: this.endDate };
	}
}

/**
 * cnst-func to be able to instantiate an empty regularIncome.
 * Used in view.
*/
export const regularSpendingConst = (): RegularSpendingViewModel => {
	return new RegularSpendingViewModel('', '', 0, 0, true, new Date(), new Date()) ;
}

import { RegularIncome } from "src/app/core/models/states.model";
import { EditableView } from "src/app/shared/models/editable-view.model";

export class RegularIncomeViewModel extends EditableView<RegularIncome,RegularIncomeViewModel> implements RegularIncome {
	constructor(
		public name: string,
		public description: string,
		private _income: number,
		public startDate: Date,
		public endDate?: Date) {
			super();
		}

	public set income(income: number) {
		this._income = income * 1;
	}
	public get income(): number {
		return this._income;
	}

	public static createBy =
		(regularIncome: RegularIncome): RegularIncomeViewModel => new RegularIncomeViewModel(regularIncome.name, regularIncome.description, regularIncome.income, regularIncome.startDate, regularIncome.endDate);

	protected byInterface(dataOnly: RegularIncome): RegularIncomeViewModel {
		return RegularIncomeViewModel.createBy(dataOnly);
	}
	public toInterface(): RegularIncome {
		return {name: this.name, description: this.description, income: this._income, startDate: this.startDate, endDate: this.endDate};
	}
}	
/**
 * cnst-func to be able to instantiate an empty regularIncome.
 * Used in view.
*/
export const regularIncomeConst = (): RegularIncomeViewModel => new RegularIncomeViewModel('','',0, new Date(), new Date());

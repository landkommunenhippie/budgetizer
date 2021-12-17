import { OneTimeIncome } from "src/app/core/models/states.model";
import { EditableView } from "src/app/shared/models/editable-view.model";

export class OneTimeIncomeViewModel extends EditableView<OneTimeIncome, OneTimeIncomeViewModel> implements OneTimeIncome {
	
	constructor(
		public name: string,
		public description: string,
		public date: Date,
		private _income: number) {
			super();
		}

	public set income(income: number) {
		this._income = income * 1;
	}
	public get income(): number {
		return this._income;
	}

	public static createBy = (oneTimeIncome: OneTimeIncome): OneTimeIncomeViewModel => new OneTimeIncomeViewModel(oneTimeIncome.name, oneTimeIncome.description, oneTimeIncome.date, oneTimeIncome.income); 

	protected byInterface(dataOnly: OneTimeIncome): OneTimeIncomeViewModel {
		return OneTimeIncomeViewModel.createBy(dataOnly);
	}

	public toInterface(): OneTimeIncome {
		return {
			name: this.name,
			description: this.description,
			date: this.date,
			income: this.income
		};
		
	}

}

export const oneTimeIncomeCons = () : OneTimeIncomeViewModel => new OneTimeIncomeViewModel('', '', new Date(), 0);
import { OneTimeSpending } from 'src/app/core/models/states.model'
import { EditableView } from 'src/app/shared/models/editable-view.model';

export class OneTimeSpendingView extends EditableView<OneTimeSpending, OneTimeSpendingView> implements OneTimeSpending {
	
	constructor(
		public name: string,
		public description: string,
		public date: Date,
		private _spending: number) {
			super();
		}

		public set spending(spending: number) {
			this._spending = spending * 1;
		}
		public get spending(): number {
			return this._spending;
		}

		public static createBy = (oneTimeSpending: OneTimeSpending) => new OneTimeSpendingView(oneTimeSpending.name, oneTimeSpending.description, oneTimeSpending.date, oneTimeSpending.spending);
		
		protected byInterface(dataOnly: OneTimeSpending): OneTimeSpendingView {
			return OneTimeSpendingView.createBy(dataOnly);
		}
		public toInterface(): OneTimeSpending {
			return {
				name: this.name,
				description: this.description,
				date: this.date,
				spending: this.spending
			};
		}
	
}

export const oneTimeSpendingConst = (): OneTimeSpendingView => new OneTimeSpendingView('', '', new Date(), 0);
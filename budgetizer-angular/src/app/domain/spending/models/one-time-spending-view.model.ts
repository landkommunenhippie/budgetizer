import { OneTimeSpending } from 'src/app/core/models/states.model'

export class OneTimeSpendingView implements OneTimeSpending {

	constructor(
		public name: string,
		public description: string,
		public date: Date,
		private _spending: number) { }

		public set spending(spending: number) {
			this._spending = spending * 1;
		}
		public get spending(): number {
			return this._spending;
		}

		public static createBy = (oneTimeSpending: OneTimeSpending) => new OneTimeSpendingView(oneTimeSpending.name, oneTimeSpending.description, oneTimeSpending.date, oneTimeSpending.spending);
		
		public toOneTimeSpending(): OneTimeSpending {
			return {
				name: this.name,
				description: this.description,
				date: this.date,
				spending: this.spending
			};
		}
}

export const oneTimeSpendingConst = (): OneTimeSpendingView => new OneTimeSpendingView('', '', new Date(), 0);
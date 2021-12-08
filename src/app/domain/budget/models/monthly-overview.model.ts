import { MutableState } from "src/app/core/state/mutable-state.model";

export class MonthlyOverview implements MutableState<MonthlyOverview> {
	constructor(
		public month: Date,
		public income: number,
		public spending: number,
		public accountAtStart?:number,
		public accountAtEnd?:number,
		public saving?: number) { }
	
		public clone = (): MonthlyOverview => 
			new MonthlyOverview(
				this.month,
				this.income,
				this.spending,
				this.accountAtStart,
				this.accountAtEnd,
				this.saving
			);

}

import { MonthlyAccountOverview } from "src/app/core/models/states.model";

export class MonthlyAccountOverviewViewModel  {
	constructor(
		public month: Date,
		public accountAtStart:number,
		public accountAtEnd:number,
		public saving: number) { }
	
		public static createBy =
		(monthlyAccountOverview: MonthlyAccountOverview): MonthlyAccountOverviewViewModel => 
			new MonthlyAccountOverviewViewModel(monthlyAccountOverview.month, monthlyAccountOverview.accountAtStart, monthlyAccountOverview.accountAtEnd, monthlyAccountOverview.saving);

		public toMonthlyAccountOverview(): MonthlyAccountOverview {
			return { month: this.month, accountAtStart: this.accountAtStart, accountAtEnd: this.accountAtEnd, saving: this.saving };
		}
}

import { MonthlyAccountOverview } from "src/app/core/models/states.model";

export class MonthlyAccountOverviewViewModel implements MonthlyAccountOverview  {
	constructor(
		public month: Date,
		public accountAtStart:number,
		public accountAtEnd:number,
		public realLeaving: number) { }
	
		public static createBy =
		(monthlyAccountOverview: MonthlyAccountOverview): MonthlyAccountOverviewViewModel => 
			new MonthlyAccountOverviewViewModel(monthlyAccountOverview.month, monthlyAccountOverview.accountAtStart, monthlyAccountOverview.accountAtEnd, monthlyAccountOverview.realLeaving);

		public toMonthlyAccountOverview(): MonthlyAccountOverview {
			return { month: this.month, accountAtStart: this.accountAtStart, accountAtEnd: this.accountAtEnd, realLeaving: this.realLeaving };
		}
}

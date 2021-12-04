import * as Moment from 'moment';
export class MonthlyOverview {
	constructor(
		public month: Moment.Moment,
		public income: number,
		public spending: number,
		public accountAtStart?:number,
		public accountAtEnd?:number,
		public saving?: number) { }
	
	monthString(): string {
		return this.month.format("MMM");
	}
}
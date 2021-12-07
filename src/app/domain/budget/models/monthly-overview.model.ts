export class MonthlyOverview {
	constructor(
		public month: Date,
		public income: number,
		public spending: number,
		public accountAtStart?:number,
		public accountAtEnd?:number,
		public saving?: number) { }
}

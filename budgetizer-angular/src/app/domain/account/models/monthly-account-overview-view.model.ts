import { MonthlyAccountOverview } from "src/app/core/models/states.model";
import { EditableView } from "src/app/shared/models/editable-view.model";

export class MonthlyAccountOverviewViewModel extends EditableView<MonthlyAccountOverview, MonthlyAccountOverviewViewModel> implements MonthlyAccountOverview  {
	
	constructor(
		public month: Date,
		public accountAtStart:number,
		public accountAtEnd:number,
		public reserveAssets: number) {
			super();
		}
	
		public static createBy =
		(monthlyAccountOverview: MonthlyAccountOverview): MonthlyAccountOverviewViewModel => 
			new MonthlyAccountOverviewViewModel(monthlyAccountOverview.month, monthlyAccountOverview.accountAtStart, monthlyAccountOverview.accountAtEnd, monthlyAccountOverview.reserveAssets);

		protected byInterface(dataOnly: MonthlyAccountOverview): MonthlyAccountOverviewViewModel {
			return MonthlyAccountOverviewViewModel.createBy(dataOnly);
		}
		public toInterface(): MonthlyAccountOverview {
			return { month: this.month, accountAtStart: this.accountAtStart, accountAtEnd: this.accountAtEnd, reserveAssets: this.reserveAssets };
		}
		
}

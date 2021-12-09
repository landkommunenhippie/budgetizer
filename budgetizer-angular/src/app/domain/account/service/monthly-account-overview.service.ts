import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { monthlyAccountOverviewsFromServer } from "../state/monthly-account-overview.action";
import { MonthlyAccountOverview } from "src/app/core/models/states.model";

@Injectable({ providedIn: 'root' })
export class MonthlyAccountOverviewService {
  constructor(private store: Store) {}
	
	/**
	 * Procedure to load initial monthlyOverviews and store them
	 * Dummy Impl for developing
	 * Replace with HTTP-Call later
	 * 
	*/
  loadMonthlyAccountOverviews(): void {
    let monthlyAccountOverviews: MonthlyAccountOverview[] =   
			[
				{ month: new Date(2021, 1,  1), accountAtStart: 10000, accountAtEnd: 8000, saving: 150 },
			];
			this.store.dispatch(monthlyAccountOverviewsFromServer({ monthlyAccountOverviews }));
  }
}
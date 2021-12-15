import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { monthlyAccountOverviewsFromServer } from "../state/monthly-account-overview.action";
import { MonthlyAccountOverview } from "src/app/core/models/states.model";
import { HttpService } from "src/app/core/service/http.service";
import { selectMonthlyAccountOverviews } from "src/app/core/state/account.selector";

@Injectable({ providedIn: 'root' })
export class MonthlyAccountOverviewService {

	constructor(
		private _store: Store,
		private _httpService: HttpService) { }
			
	/**
	 * Procedure to load initial monthlyOverviews and store them
	 * 
	*/
  loadMonthlyAccountOverviews(): void {
    this._httpService.doGetAndApply(
			'tst/monthly-account-overview',
			(monthlyAccountOverviews: MonthlyAccountOverview[]) => {
			// dispatch results to store	
			this._store.dispatch(monthlyAccountOverviewsFromServer({ monthlyAccountOverviews }));
			// listen to store to sync results		
			this._store.select(selectMonthlyAccountOverviews)
				.subscribe((monthlyAccountOverviews) => { this.syncMonthlyAccountOverview(monthlyAccountOverviews) } );		
			}
		);
  }

	syncMonthlyAccountOverview(monthlyAccountOverviews: MonthlyAccountOverview[]) {
		this._httpService.doPut('tst/monthly-account-overview', monthlyAccountOverviews);
	}
}
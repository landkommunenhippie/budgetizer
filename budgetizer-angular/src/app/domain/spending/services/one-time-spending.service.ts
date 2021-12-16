import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { OneTimeSpending } from "src/app/core/models/states.model";
import { HttpService } from "src/app/core/service/http.service";
import { oneTimeSpendingsFromServer } from "../state/one-time-spending.action";
import { selectOneTimeSpendings } from "src/app/core/state/spending.selector";

@Injectable({ providedIn: 'root' })
export class OneTimeSpendingService {

 constructor(
		private _store: Store,
		private _httpService: HttpService) { }
	
	/**
	 * Procedure to load initial regularIncomes and store them
	 * 
	*/
  loadOneTimeSpendings(): void {
    this._httpService.doGetAndApply(
			'tst/one-time-spendings',
			(oneTimeSpendings: OneTimeSpending[]) => {
			// dispatch results to store	
			this._store.dispatch(oneTimeSpendingsFromServer({ oneTimeSpendings }));
			// listen to store to sync results		
			this._store.select(selectOneTimeSpendings)
				.subscribe((spendings) => { this.syncOneTimeSpendings(spendings) } );
			}
		);
  }

	syncOneTimeSpendings(regularSpendings: OneTimeSpending[]) {
		this._httpService.doPut('tst/one-time-spendings', regularSpendings);
	}
}
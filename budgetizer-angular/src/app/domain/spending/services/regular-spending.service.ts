import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { regularSpendingsFromServer } from "../state/regular-spending.action";
import { RegularSpending } from "src/app/core/models/states.model";
import { HttpService } from "src/app/core/service/http.service";
import { selectRegularSpendings } from "src/app/core/state/spending.selector";

@Injectable({ providedIn: 'root' })
export class RegularSpendingService {
  constructor(
		private _store: Store,
		private _httpService: HttpService) { }
	
	/**
	 * Procedure to load initial regularSpendings and store them
	 * 
	*/
  loadRegularSpendings(): void {
    this._httpService.doGetAndApply(
			'tst/regular-spendings',
			(regularSpendings: RegularSpending[]) => {
			// dispatch results to store	
			this._store.dispatch(regularSpendingsFromServer({ regularSpendings }));
			// listen to store to sync results		
			this._store.select(selectRegularSpendings)
				.subscribe((spendings) => { this.syncRegularSpendings(spendings) } );		
			}
		);
  }


	syncRegularSpendings(regularSpendings: RegularSpending[]) {
		this._httpService.doPut('tst/regular-spendings', regularSpendings);
	}
}
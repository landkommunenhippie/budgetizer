import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { OneTimeIncome } from "src/app/core/models/states.model";
import { selectOneTimeIncomes } from "src/app/core/state/income.selector";
import { HttpService } from "src/app/core/service/http.service";
import { oneTimeIncomesFromServer } from "../state/one-time-income.action";

@Injectable({ providedIn: 'root' })
export class OneTimeIncomeService {

 constructor(
		private _store: Store,
		private _httpService: HttpService) { }
	
	/**
	 * Procedure to load initial regularIncomes and store them
	 * 
	*/
  loadOneTimeIncomes(): void {
    this._httpService.doGetAndApply(
			'tst/one-time-incomes',
			(oneTimeIncomes: OneTimeIncome[]) => {
			// dispatch results to store	
			this._store.dispatch(oneTimeIncomesFromServer({ oneTimeIncomes }));
			// listen to store to sync results		
			this._store.select(selectOneTimeIncomes)
				.subscribe((incomes) => { this.syncOneTimeIncomes(incomes) } );
			}
		);
  }

	syncOneTimeIncomes(regularIncomes: OneTimeIncome[]) {
		this._httpService.doPut('tst/one-time-incomes', regularIncomes);
	}
}
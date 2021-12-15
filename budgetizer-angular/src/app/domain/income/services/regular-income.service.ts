import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { regularIncomesFromServer } from "../state/regular-income.action";
import { RegularIncome } from "src/app/core/models/states.model";
import { selectRegularIncomes } from "src/app/core/state/income.selector";
import { HttpService } from "src/app/core/service/http.service";

@Injectable({ providedIn: 'root' })
export class RegularIncomeService {

 constructor(
		private _store: Store,
		private _httpService: HttpService) { }
	
	/**
	 * Procedure to load initial regularIncomes and store them
	 * 
	*/
  loadRegularIncomes(): void {
    this._httpService.doGetAndApply(
			'tst/regular-incomes',
			(regularIncomes: RegularIncome[]) => {
			// dispatch results to store	
			this._store.dispatch(regularIncomesFromServer({ regularIncomes }));
			// listen to store to sync results		
			this._store.select(selectRegularIncomes)
				.subscribe((incomes) => { this.syncRegularIncomes(incomes) } );
			}
		);
  }

	syncRegularIncomes(regularIncomes: RegularIncome[]) {
		this._httpService.doPut('tst/regular-incomes', regularIncomes);
	}
}
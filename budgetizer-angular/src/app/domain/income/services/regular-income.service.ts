import { Injectable, OnInit } from "@angular/core";
import { Store } from '@ngrx/store';
import { regularIncomesFromServer } from "../state/regular-income.action";
import { RegularIncome } from "src/app/core/models/states.model";
import { selectRegularIncomes } from "src/app/core/state/income.selector";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class RegularIncomeService {

	// TODO replace with environment config
	private _endpoint = 'http://localhost:3000';
	private httpHeader: any = {};
  constructor(
		private store: Store,
		private httpClient: HttpClient) {
			
			this.httpHeader = {
				headers: new HttpHeaders({
					'Content-Type': 'application/json'
				})
		}

		store.select(selectRegularIncomes)
				.subscribe((incomes) => { this.syncRegularIncomes(incomes) } );
	
	}
	
	/**
	 * Procedure to load initial regularIncomes and store them
	 * Dummy Impl for developing
	 * Replace with HTTP-Call later
	 * 
	*/
  loadRegularIncomes(): void {
    let regularIncomes: RegularIncome[] =   
			[
				{name: 'Lohn', description: 'zum ende des Monats', income: 6000},
				{name: 'Kindergeld', description: 'Mitte des Monats', income: 420}
			];
			this.store.dispatch(regularIncomesFromServer({ regularIncomes }));
  }

	syncRegularIncomes(regularIncomes: RegularIncome[]) {
		this.httpClient.put<RegularIncome[]>(`${this._endpoint}/tst/regular-incomes`, JSON.stringify(regularIncomes), this.httpHeader)
		.subscribe(
			(response) => { console.log("DONE", response); },
			(error) => { console.log("ERROR", error); });
	}
}
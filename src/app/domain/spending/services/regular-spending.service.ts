import { Injectable } from "@angular/core";
import { RegularSpending, RegularSpendingBuilder } from "../models/regular-spending.model";
import { Store } from '@ngrx/store';
import { regularSpendingsFromServer } from "../state/regular-spending.action";

@Injectable({ providedIn: 'root' })
export class RegularSpendingService {
  constructor(private store: Store) {}
	
	/**
	 * Procedure to load initial regularSpendings and store them
	 * Dummy Impl for developing
	 * Replace with HTTP-Call later
	 * 
	*/
  loadRegularSpendings(): void {
    let regularSpendings: RegularSpending[] =   
		[
			new RegularSpendingBuilder().name('Miete').description('zum Beginn des Monats').spendingMonthly(900).build(),
			new RegularSpendingBuilder().name('Versicherung').description('zum Beginn des Monats').spendingAnually(400).build(),
		];
			this.store.dispatch(regularSpendingsFromServer({ regularSpendings }));
  }
}
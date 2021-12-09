import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { regularIncomesFromServer } from "../state/regular-income.action";
import { RegularIncome } from "src/app/core/models/regular-income.model";

@Injectable({ providedIn: 'root' })
export class RegularIncomeService {
  constructor(private store: Store) {}
	
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
}
import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { regularSpendingsFromServer } from "../state/regular-spending.action";
import { RegularSpending } from "src/app/core/models/states.model";

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
				{ name: 'Miete', description: 'zum Beginn des Monats', spendingMonthly: 900, spendingAnually: 900*12  },
				{ name: 'Versicherung', description: 'zum Ende des Monats', spendingMonthly: 400/20, spendingAnually: 400  }
			];
			this.store.dispatch(regularSpendingsFromServer({ regularSpendings }));
  }
}
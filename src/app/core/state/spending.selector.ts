import {createSelector, createFeatureSelector} from '@ngrx/store'
import { RegularSpending } from '../../domain/spending/models/regular-spending.model'

export const selectRegularSpendings = createFeatureSelector<RegularSpending[]>('regularSpendings');


export const selectRegularSpendingsSumPerMonth = createSelector(
  selectRegularSpendings,
   (regularSpendings) => {
    if (regularSpendings) {
			return regularSpendings
				.map(spending => spending.spendingMonthly)
				.reduce(((acc: number, curr: number) => acc + curr), 0 );
    } else {
      return -1;
    }
  }
);
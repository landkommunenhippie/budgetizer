import { createSelector, createFeatureSelector } from '@ngrx/store'
import { RegularIncome } from '../../domain/income/models/regular-income.model'

export const selectRegularIncomes = createFeatureSelector<RegularIncome[]>('regularIncomes');

export const selectRegularIncomesSum = createSelector(
  selectRegularIncomes,
   (regularIncomes) => {
    if (regularIncomes) {
			return regularIncomes
				.map(income => income.income)
				.reduce(((acc: number, curr: number) => acc + curr ), 0 );
    } else {
      return -1;
    }
  }
);

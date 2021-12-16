import { createSelector, createFeatureSelector } from '@ngrx/store'
import { OneTimeIncome, RegularIncome } from '../models/states.model';

/**
 *  Regular Incomes
 */
export const selectRegularIncomes = createFeatureSelector<RegularIncome[]>('regularIncomes');

/**
 *  One Time Incomes
 */
 export const selectOneTimeIncomes = createFeatureSelector<OneTimeIncome[]>('oneTimeIncomes');


export const selectIncomesSumofMonth = createSelector(
  selectRegularIncomes,
	selectOneTimeIncomes,
   (regularIncomes, oneTimeIncomes) => {
    let monthIncomeMap: any = {};
			
		if (regularIncomes && oneTimeIncomes) {
			for (let i = 0; i < 12; i++) {
				let regIncomesSum =  regularIncomes
				.map(income => income.income)
				.reduce(((acc: number, curr: number) => acc + curr ), 0 );
				let oneTimeIncomesSum =
					oneTimeIncomes
						.filter((income: OneTimeIncome) => new Date(income.date).getMonth() === i)
						.map((income: OneTimeIncome) => income.income)
						.reduce(((acc: number, curr: number) => acc + curr ), 0 );
			
					monthIncomeMap[i] = regIncomesSum + oneTimeIncomesSum;
			}
    } 
		return monthIncomeMap;
  }
);
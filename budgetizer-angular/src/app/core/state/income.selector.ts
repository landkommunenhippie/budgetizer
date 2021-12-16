import { createSelector, createFeatureSelector } from '@ngrx/store'
import { OneTimeIncome, RegularIncome } from '../models/states.model';
import { selectMonthlyAccountOverviews } from './account.selector';

/**
 *  Regular Incomes
 */
export const selectRegularIncomes = createFeatureSelector<RegularIncome[]>('regularIncomes');

/**
 *  One Time Incomes
 */
 export const selectOneTimeIncomes = createFeatureSelector<OneTimeIncome[]>('oneTimeIncomes');

export const incomePerMonthMapKey = (date: Date) => `${date.getMonth()}-${date.getFullYear()}`; 
export const selectIncomesSumofMonth = createSelector(
  selectRegularIncomes,
	selectOneTimeIncomes,
	selectMonthlyAccountOverviews,
	(regularIncomes, oneTimeIncomes, monthlyAccountOverviews) => {
    let monthIncomeMap: any = {};
			
		if (regularIncomes && oneTimeIncomes && monthlyAccountOverviews) {
			for (let monthlyAccountOverview of monthlyAccountOverviews) {
				let dateOfMonthlyAccountOverview = new Date(monthlyAccountOverview.month);
				let regIncomesSum =  regularIncomes
					.filter(income => 
							new Date(income.startDate) <= dateOfMonthlyAccountOverview
							&& (
								income.endDate === undefined
								|| income.endDate === null
								|| new Date(income.endDate) >= dateOfMonthlyAccountOverview
							)
						)
					.map(income => income.income)
					.reduce(((acc: number, curr: number) => acc + curr ), 0 );
				
				let oneTimeIncomesSum =
					oneTimeIncomes
						.filter((income: OneTimeIncome) => {
								let incomeDate = new Date(income.date); 
								return incomeDate.getMonth() === dateOfMonthlyAccountOverview.getMonth()
									&& incomeDate.getFullYear === dateOfMonthlyAccountOverview.getFullYear;
							}
						)
						.map((income: OneTimeIncome) => income.income)
						.reduce(((acc: number, curr: number) => acc + curr ), 0 );
			
				monthIncomeMap[incomePerMonthMapKey(dateOfMonthlyAccountOverview)] = regIncomesSum + oneTimeIncomesSum;
			}
		}
		return monthIncomeMap;
	}
);
import {createSelector, createFeatureSelector} from '@ngrx/store'
import { OneTimeSpending, RegularSpending } from '../models/states.model';
import { selectMonthlyAccountOverviews } from './account.selector';

/**
 * Regular Spendings
*/
export const selectRegularSpendings = createFeatureSelector<RegularSpending[]>('regularSpendings');

/**
 * One Time Spendings
*/
export const selectOneTimeSpendings = createFeatureSelector<OneTimeSpending[]>('oneTimeSpendings');


export const spendingPerMonthMapKey = (date: Date) => `${date.getMonth()}-${date.getFullYear()}`; 
export const selectSpendingsSumPerMonth = createSelector(
  selectRegularSpendings,
	selectOneTimeSpendings,
	selectMonthlyAccountOverviews,
   (regularSpendings, oneTimeSpendings, monthlyAccountOverviews) => {
    let monthSpendingMap: any = {};

		if (regularSpendings && oneTimeSpendings && monthlyAccountOverviews) {
			for (let monthlyAccountOverview of monthlyAccountOverviews) {
				let dateOfMonthlyAccountOverview = new Date(monthlyAccountOverview.month);

				let regSpendingSum = regularSpendings
					.filter(spending => 
						new Date(spending.startDate) <= dateOfMonthlyAccountOverview
						&& (
							spending.endDate === undefined
							|| spending.endDate === null
							|| new Date(spending.endDate) >= dateOfMonthlyAccountOverview
						)
					)
					.map(spending => spending.spendingMonthly)
					.reduce(((acc: number, curr: number) => acc + curr ), 0 );
				let oneTimeSpendingSum =
					oneTimeSpendings
						.filter((spending: OneTimeSpending) => {
							let spendingDate = new Date(spending.date); 
							return spendingDate.getMonth() === dateOfMonthlyAccountOverview.getMonth()
								&& spendingDate.getFullYear === dateOfMonthlyAccountOverview.getFullYear;
							}
						)
						.map((spending: OneTimeSpending) => spending.spending)
						.reduce(((acc: number, curr: number) => acc + curr ), 0 );
				monthSpendingMap[spendingPerMonthMapKey(dateOfMonthlyAccountOverview)] = regSpendingSum + oneTimeSpendingSum;
			}
		}
    return monthSpendingMap;
    
  }
);
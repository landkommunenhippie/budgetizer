import {createSelector, createFeatureSelector} from '@ngrx/store'
import { oneTimeSpendingsFromServer } from 'src/app/domain/spending/state/one-time-spending.action';
import { OneTimeSpending, RegularSpending } from '../models/states.model';

/**
 * Regular Spendings
*/
export const selectRegularSpendings = createFeatureSelector<RegularSpending[]>('regularSpendings');

/**
 * One Time Spendings
*/
export const selectOneTimeSpendings = createFeatureSelector<OneTimeSpending[]>('oneTimeSpendings');


export const selectSpendingsSumPerMonth = createSelector(
  selectRegularSpendings,
	selectOneTimeSpendings,
   (regularSpendings, oneTimeSpendings) => {
    let monthSpendingMap: any = {};

		if (regularSpendings && oneTimeSpendings) {
			for(let i = 0; i < 12; i++) {
				let regSpendingSum =  regularSpendings
				.map(spending => spending.spendingMonthly)
				.reduce(((acc: number, curr: number) => acc + curr ), 0 );
				let oneTimeSpendingSum =
					oneTimeSpendings
						.filter((spending: OneTimeSpending) => new Date(spending.date).getMonth() === i)
						.map((spending: OneTimeSpending) => spending.spending)
						.reduce(((acc: number, curr: number) => acc + curr ), 0 );
				monthSpendingMap[i] = regSpendingSum + oneTimeSpendingSum;
			}
		}
    return monthSpendingMap;
    
  }
);
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
export const selectOneTimeSpendingsSumPerMonth = createSelector(
  selectOneTimeSpendings,
	selectMonthlyAccountOverviews,
   (oneTimeSpendings, monthlyAccountOverviews) => {
    let monthSpendingMap: any = {};

		if (oneTimeSpendings && monthlyAccountOverviews) {
			for (let monthlyAccountOverview of monthlyAccountOverviews) {
				let dateOfMonthlyAccountOverview = new Date(monthlyAccountOverview.month);

				let oneTimeSpendingSum =
					oneTimeSpendings
						.filter((spending: OneTimeSpending) => {
							let spendingDate = new Date(spending.date); 
							return spendingDate.getMonth() === dateOfMonthlyAccountOverview.getMonth()
								&& spendingDate.getFullYear() === dateOfMonthlyAccountOverview.getFullYear();
							}
						)
						.map((spending: OneTimeSpending) => spending.spending)
						.reduce(((acc: number, curr: number) => acc + curr ), 0 );
				monthSpendingMap[spendingPerMonthMapKey(dateOfMonthlyAccountOverview)] = oneTimeSpendingSum;
			}
		}
    return monthSpendingMap;
    
  }
);

export const selectRegularSpendingsSumPerMonth = createSelector(
  selectRegularSpendings,
	selectMonthlyAccountOverviews,
   (regularSpendings, monthlyAccountOverviews) => {
    let monthSpendingMap: any = {};

		if (regularSpendings && monthlyAccountOverviews) {
			for (let monthlyAccountOverview of monthlyAccountOverviews) {
				let dateOfMonthlyAccountOverview = new Date(monthlyAccountOverview.month);

				let regSpendingSum = regularSpendings
					.filter(spending =>
						{ 
							let spendingStartDate = new Date(spending.startDate);
							//set Date to beginning of month ot include starts within the month
							spendingStartDate.setDate(1);
							return spendingStartDate <= dateOfMonthlyAccountOverview
							&& (
								spending.endDate === undefined
								|| spending.endDate === null
								|| new Date(spending.endDate) >= dateOfMonthlyAccountOverview
							)
						}
					)
					.map(spending => spending.spendingMonthly)
					.reduce(((acc: number, curr: number) => acc + curr ), 0 );
				monthSpendingMap[spendingPerMonthMapKey(dateOfMonthlyAccountOverview)] = regSpendingSum;
			}
		}
    return monthSpendingMap;
  }
);

export const selectMonthlyRegularSpendingsSumPerMonth = createSelector(
  selectRegularSpendings,
	selectMonthlyAccountOverviews,
   (regularSpendings, monthlyAccountOverviews) => {
    let monthSpendingMap: any = {};

		if (regularSpendings && monthlyAccountOverviews) {
			for (let monthlyAccountOverview of monthlyAccountOverviews) {
				let dateOfMonthlyAccountOverview = new Date(monthlyAccountOverview.month);

				let regSpendingSum = regularSpendings
					.filter(spending =>
						{ 
							let spendingStartDate = new Date(spending.startDate);
							//set Date to beginning of month ot include starts within the month
							spendingStartDate.setDate(1);
							return spending.monthly
							&& spendingStartDate <= dateOfMonthlyAccountOverview
							&& (
								spending.endDate === undefined
								|| spending.endDate === null
								|| new Date(spending.endDate) >= dateOfMonthlyAccountOverview
							)
						}
					)
					.map(spending => spending.spendingMonthly)
					.reduce(((acc: number, curr: number) => acc + curr ), 0 );
				monthSpendingMap[spendingPerMonthMapKey(dateOfMonthlyAccountOverview)] = regSpendingSum;
			}
		}
    return monthSpendingMap;
  }
);

export const selectNonMonthlyRegularSpendingsSumPerMonth = createSelector(
  selectRegularSpendings,
	selectMonthlyAccountOverviews,
   (regularSpendings, monthlyAccountOverviews) => {
    let monthSpendingMap: any = {};

		if (regularSpendings && monthlyAccountOverviews) {
			for (let monthlyAccountOverview of monthlyAccountOverviews) {
				let dateOfMonthlyAccountOverview = new Date(monthlyAccountOverview.month);

				let regSpendingSum = regularSpendings
					.filter(spending =>
						{ 
							let spendingStartDate = new Date(spending.startDate);
							//set Date to beginning of month ot include starts within the month
							spendingStartDate.setDate(1);
							return !spending.monthly
							&& spendingStartDate <= dateOfMonthlyAccountOverview
							&& (
								spending.endDate === undefined
								|| spending.endDate === null
								|| new Date(spending.endDate) >= dateOfMonthlyAccountOverview
							)
						}
					)
					.map(spending => spending.spendingMonthly)
					.reduce(((acc: number, curr: number) => acc + curr ), 0 );
				monthSpendingMap[spendingPerMonthMapKey(dateOfMonthlyAccountOverview)] = regSpendingSum;
			}
		}
    return monthSpendingMap;
  }
);
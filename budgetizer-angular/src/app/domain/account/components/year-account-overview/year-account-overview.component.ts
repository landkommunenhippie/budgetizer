import { Component, OnInit } from '@angular/core';
import { MonthlyAccountOverviewViewModel } from '../../models/monthly-account-overview-view.model';
import { EditableTableDescrption } from 'src/app/shared/models/editable-table-description.model';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { selectIncomesSumofMonth as selectIncomesSumPerMonth } from 'src/app/core/state/income.selector';
import { selectSpendingsSumPerMonth } from 'src/app/core/state/spending.selector';
import { selectMonthlyAccountOverviews } from 'src/app/core/state/account.selector';
import { MonthlyAccountOverview } from 'src/app/core/models/states.model';
import { monthlyAccountOverviewsModified } from '../../state/monthly-account-overview.action';

@Component({
  selector: 'app-year-account-overview',
  templateUrl: './year-account-overview.component.html',
  styleUrls: ['./year-account-overview.component.scss']
})
export class YearAccountOverviewComponent implements OnInit {
	
	months: MonthlyAccountOverviewViewModel[] = [];
	displayedColumns: string[] = ['month', 'income', 'spending', 'accountAtStart', 'accountAtEnd', 'saving'];
	tableDescription: EditableTableDescrption[] = [
		{label: 'Monat', valuePropertyName: 'month', valueInputType: 'date', editable: true, dateMonthOnly: true, displayProcessor: this.displayMonth},
		{label: 'Einnahmen', valuePropertyName: 'calc_income',valueInputType: 'number',  dataSource: this.getIncomesOfMonth.bind(this)},
		{label: 'Ausgaben', valuePropertyName: 'calc_spending',valueInputType: 'number',  dataSource: this.getSpendingsOfMonth.bind(this)},
		{label: 'Monatsbudget', valuePropertyName: 'calc_monthly_budget', valueInputType: 'number', dataSource: this.calcMonthlyBudget.bind(this)},
		{label: 'Kontostand Monatsbeginn', valuePropertyName: 'accountAtStart',valueInputType: 'number', editable: true},
		{label: 'Kontostand Monatsende', valuePropertyName: 'accountAtEnd',valueInputType: 'number', editable: true},
		{label: 'Sparen', valuePropertyName: 'saving',valueInputType: 'number', editable: true}
	]
	emptyItemFactory = () => new MonthlyAccountOverviewViewModel(new Date(), 0, 0, 0);

	private _incomesSumPerMonth: any = {};
	private _spendingSumPerMonth: any = {};
	private _ngDestroyed$ = new Subject();
	
  constructor(private store: Store) {	}

  ngOnInit(): void {
		this.store.select(selectMonthlyAccountOverviews)
			.pipe(takeUntil(this._ngDestroyed$))
			.subscribe((monthlyAccountOverviews: MonthlyAccountOverview[]) => this.months = monthlyAccountOverviews.map(monthlyOverview => MonthlyAccountOverviewViewModel.createBy(monthlyOverview)));

		this.store.select(selectIncomesSumPerMonth)
			.pipe(takeUntil(this._ngDestroyed$))
			.subscribe((sumOfRegulars: any) => this._incomesSumPerMonth = sumOfRegulars);

		this.store.select(selectSpendingsSumPerMonth)
			.pipe(takeUntil(this._ngDestroyed$))
			.subscribe((sumOfRegulars: any) => this._spendingSumPerMonth = sumOfRegulars);
	}

	ngOnDestroy(): void {
		this._ngDestroyed$.next(undefined);
	}

	updateMonthlyAccountOverviews(monthlyAccountOverviewViews: MonthlyAccountOverviewViewModel[]):void {
		let monthlyAccountOverviews = monthlyAccountOverviewViews.map(monthlyOverviewView => monthlyOverviewView.toMonthlyAccountOverview());
		this.store.dispatch(monthlyAccountOverviewsModified({ monthlyAccountOverviews }));
	}

	displayMonth(date: Date|string) {
		let options: Intl.DateTimeFormatOptions = {month: 'short'};
		let dateToParse: Date = typeof date === 'string' ?  new Date(date) : date;
		
		return new Intl.DateTimeFormat('de-DE', options).format(dateToParse); 
	}

	getIncomesOfMonth(monthlyOverview: MonthlyAccountOverviewViewModel): number {
		let dateToParse: Date = typeof monthlyOverview.month === 'string' ?  new Date(monthlyOverview.month) : monthlyOverview.month;
		return this._incomesSumPerMonth[dateToParse.getMonth()];
	}

	getSpendingsOfMonth(monthlyOverview: MonthlyAccountOverviewViewModel): number {
		let dateToParse: Date = typeof monthlyOverview.month === 'string' ?  new Date(monthlyOverview.month) : monthlyOverview.month;
		
		return this._spendingSumPerMonth[dateToParse.getMonth()];
	}

	calcMonthlyBudget(monthlyOverview: MonthlyAccountOverviewViewModel): number {
		let dateToParse: Date = typeof monthlyOverview.month === 'string' ?  new Date(monthlyOverview.month) : monthlyOverview.month;
			
		return this._incomesSumPerMonth[dateToParse.getMonth()] - this._spendingSumPerMonth[dateToParse.getMonth()] - monthlyOverview.saving;
 	}

}

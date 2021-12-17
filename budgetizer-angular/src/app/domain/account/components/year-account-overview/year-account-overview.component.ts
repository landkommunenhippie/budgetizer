import { Component, OnInit } from '@angular/core';
import { MonthlyAccountOverviewViewModel } from '../../models/monthly-account-overview-view.model';
import { EditableTableDescrption } from 'src/app/shared/models/editable-table-description.model';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { incomePerMonthMapKey, selectIncomesSumofMonth as selectIncomesSumPerMonth } from 'src/app/core/state/income.selector';
import { selectMonthlyRegularSpendingsSumPerMonth, selectNonMonthlyRegularSpendingsSumPerMonth, selectOneTimeSpendingsSumPerMonth, spendingPerMonthMapKey } from 'src/app/core/state/spending.selector';
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
		{label: 'Monat', valuePropertyName: 'month', valueInputType: 'date', editable: true, dateMonthOnly: true, displayProcessor: this.displayMonth, sortable:true, initialSort: true},
		{label: 'Einnahmen', valuePropertyName: 'calc_income',valueInputType: 'number',  dataSource: this.getIncomesOfMonth.bind(this)},
		{label: 'Explizite Fixkosten', valuePropertyName: 'calc_reg_monthly_spending',valueInputType: 'number',  dataSource: this.getMonthlyRegularSpendingsOfMonth.bind(this)},
		{label: 'Implizite Fixkosten', valuePropertyName: 'calc_reg_nonmonthly_spending',valueInputType: 'number',  dataSource: this.getNonMonthlyRegularSpendingsOfMonth.bind(this), tooltipText:'Alle Fixkosten, die nicht monatlich vom Konto abgebucht werden. Die impliziten Fixkosten sollten über Rücklagen vorgehalten werden.'},
		{label: 'Einmalige Kosten', valuePropertyName: 'calc_onetime_spending',valueInputType: 'number',  dataSource: this.getOneTimeSpendingsOfMonth.bind(this)},
		{label: 'Gesamtkosten', valuePropertyName: 'calc_all_spending',valueInputType: 'number',  dataSource: this.getAllSpendingsOfMonth.bind(this), tooltipText: 'Summe aller im Monat zu deckenden Kosten.'},
		{label: 'Tatsächliche Rücklagen', valuePropertyName: 'reserveAssets',valueInputType: 'number', editable: true, tooltipText:'Höhe an Rücklagen, die auf ein anderes eigenes Konto überwiesen wurden'},
		{label: 'Bilanz', valuePropertyName: 'calc_balance',valueInputType: 'number', editable: false, dataSource: this.calcMonthlySaving.bind(this), tooltipText: 'Differenz der tatsächlichen Rücklagen und den impliziten Fixkosten'},
		{label: 'Monatsbudget', valuePropertyName: 'calc_monthly_budget', valueInputType: 'number', dataSource: this.calcMonthlyBudget.bind(this), tooltipText: 'Im Monat auf dem Konto verfügbares Guthaben. Differenz zwischen Einnahmen und den expliziten Fixkosten, den einmaligen Kosten und den tatsächlichen Rücklagen im Monat'},
		{label: 'Kontostand Monatsbeginn', valuePropertyName: 'accountAtStart',valueInputType: 'number', editable: true},
		{label: 'Kontostand Monatsende', valuePropertyName: 'accountAtEnd',valueInputType: 'number', editable: true}
	]
	emptyItemFactory = () => new MonthlyAccountOverviewViewModel(new Date(), 0, 0, 0);

	private _incomesSumPerMonth: any = {};
	private _oneTimeSpendingSumPerMonth: any = {};
	private _monthlyRegularSpendingSumPerMonth: any = {};
	private _nonMonthlyRegularSpendingSumPerMonth: any = {};
	private _ngDestroyed$ = new Subject();
	
  constructor(private store: Store) {	}

  ngOnInit(): void {
		this.store.select(selectMonthlyAccountOverviews)
			.pipe(takeUntil(this._ngDestroyed$))
			.subscribe((monthlyAccountOverviews: MonthlyAccountOverview[]) => this.months = monthlyAccountOverviews.map(monthlyOverview => MonthlyAccountOverviewViewModel.createBy(monthlyOverview)));

		this.store.select(selectIncomesSumPerMonth)
			.pipe(takeUntil(this._ngDestroyed$))
			.subscribe((mapOfSumOfAllIncomes: any) => this._incomesSumPerMonth = mapOfSumOfAllIncomes);

		this.store.select(selectMonthlyRegularSpendingsSumPerMonth)
			.pipe(takeUntil(this._ngDestroyed$))
			.subscribe((sumOfRegularSpendingsPerMonth: any) => this._monthlyRegularSpendingSumPerMonth = sumOfRegularSpendingsPerMonth);
		
		this.store.select(selectNonMonthlyRegularSpendingsSumPerMonth)
			.pipe(takeUntil(this._ngDestroyed$))
			.subscribe((sumOfRegularSpendingsPerMonth: any) => this._nonMonthlyRegularSpendingSumPerMonth = sumOfRegularSpendingsPerMonth);
		
		this.store.select(selectOneTimeSpendingsSumPerMonth)
			.pipe(takeUntil(this._ngDestroyed$))
			.subscribe((mapOfSumOfAllOneTimeSpendings: any) => this._oneTimeSpendingSumPerMonth = mapOfSumOfAllOneTimeSpendings);
			
	}

	ngOnDestroy(): void {
		this._ngDestroyed$.next(undefined);
	}

	updateMonthlyAccountOverviews(monthlyAccountOverviewViews: MonthlyAccountOverviewViewModel[]):void {
		let monthlyAccountOverviews = monthlyAccountOverviewViews.map(monthlyOverviewView => monthlyOverviewView.toInterface());
		this.store.dispatch(monthlyAccountOverviewsModified({ monthlyAccountOverviews }));
	}

	displayMonth(date: Date|string) {
		let options: Intl.DateTimeFormatOptions = {month: 'short', year: '2-digit'};
		let dateToParse: Date = typeof date === 'string' ?  new Date(date) : date;
		
		return new Intl.DateTimeFormat('de-DE', options).format(dateToParse); 
	}

	getIncomesOfMonth(monthlyOverview: MonthlyAccountOverviewViewModel): number {
		let dateToParse: Date = typeof monthlyOverview.month === 'string' ?  new Date(monthlyOverview.month) : monthlyOverview.month;
		return this._incomesSumPerMonth[incomePerMonthMapKey(dateToParse)];
	}

	getMonthlyRegularSpendingsOfMonth(monthlyOverview: MonthlyAccountOverviewViewModel): number {
		let dateToParse: Date = typeof monthlyOverview.month === 'string' ?  new Date(monthlyOverview.month) : monthlyOverview.month;
		
		return this._monthlyRegularSpendingSumPerMonth[spendingPerMonthMapKey(dateToParse)];
	}

	getNonMonthlyRegularSpendingsOfMonth(monthlyOverview: MonthlyAccountOverviewViewModel): number {
		let dateToParse: Date = typeof monthlyOverview.month === 'string' ?  new Date(monthlyOverview.month) : monthlyOverview.month;
		
		return this._nonMonthlyRegularSpendingSumPerMonth[spendingPerMonthMapKey(dateToParse)];
	}

	getOneTimeSpendingsOfMonth(monthlyOverview: MonthlyAccountOverviewViewModel): number {
		let dateToParse: Date = typeof monthlyOverview.month === 'string' ?  new Date(monthlyOverview.month) : monthlyOverview.month;
		
		return this._oneTimeSpendingSumPerMonth[spendingPerMonthMapKey(dateToParse)];
	}

	getAllSpendingsOfMonth(monthlyOverview: MonthlyAccountOverviewViewModel): number {
		let dateToParse: Date = typeof monthlyOverview.month === 'string' ?  new Date(monthlyOverview.month) : monthlyOverview.month;
		let mapKey = spendingPerMonthMapKey(dateToParse);
		return this._oneTimeSpendingSumPerMonth[mapKey] + this._nonMonthlyRegularSpendingSumPerMonth[mapKey] + this._monthlyRegularSpendingSumPerMonth[mapKey];
	}

	calcMonthlyBudget(monthlyOverview: MonthlyAccountOverviewViewModel): number {
		let dateToParse: Date = typeof monthlyOverview.month === 'string' ?  new Date(monthlyOverview.month) : monthlyOverview.month;
		let mapKey = spendingPerMonthMapKey(dateToParse);
		return this._incomesSumPerMonth[mapKey] - this._monthlyRegularSpendingSumPerMonth[mapKey] - this._oneTimeSpendingSumPerMonth[mapKey] - monthlyOverview.reserveAssets;
 	}

	calcMonthlySaving(monthlyOverview: MonthlyAccountOverviewViewModel): number {
		let dateToParse: Date = typeof monthlyOverview.month === 'string' ?  new Date(monthlyOverview.month) : monthlyOverview.month;
		
		return  monthlyOverview.reserveAssets - this._nonMonthlyRegularSpendingSumPerMonth[spendingPerMonthMapKey(dateToParse)];
 	}

}

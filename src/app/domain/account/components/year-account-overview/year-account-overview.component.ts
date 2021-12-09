import { Component, OnInit } from '@angular/core';
import { MonthlyAccountOverviewViewModel } from '../../models/monthly-account-overview-view.model';
import { EditableTableDescrption } from 'src/app/shared/models/editable-table-description.model';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { selectRegularIncomesSum } from 'src/app/core/state/income.selector';
import { selectRegularSpendingsSumPerMonth } from 'src/app/core/state/spending.selector';


@Component({
  selector: 'app-year-account-overview',
  templateUrl: './year-account-overview.component.html',
  styleUrls: ['./year-account-overview.component.scss']
})
export class YearAccountOverviewComponent implements OnInit {
	
	months: MonthlyAccountOverviewViewModel[];
	displayedColumns: string[] = ['month', 'income', 'spending', 'accountAtStart', 'accountAtEnd', 'saving'];
	tableDescription: EditableTableDescrption[] = [
		{label: 'Monat', valuePropertyName: 'month', valueInputType: 'date', editable: true, displayProcessor: this.displayMonth},
		{label: 'Einnahmen', valuePropertyName: 'income',valueInputType: 'number', editable: false, dataSource: this.getIncomesOfMonth.bind(this)},
		{label: 'Ausgaben', valuePropertyName: 'spending',valueInputType: 'number', editable: false, dataSource: this.getSpendingsOfMonth.bind(this)},
		{label: 'Kontostand Monatsbeginn', valuePropertyName: 'accountAtStart',valueInputType: 'number', editable: true},
		{label: 'Kontostand Monatsende', valuePropertyName: 'accountAtEnd',valueInputType: 'number', editable: true},
		{label: 'Sparen', valuePropertyName: 'saving',valueInputType: 'number', editable: true}
	]
	emptyItemFactory = () => new MonthlyAccountOverviewViewModel(new Date(), 0, 0, 0);

	private _regularIncomesSum: number = -1;
	private _regularSpendingsSum: number = -1;
	private _ngDestroyed$ = new Subject();

  constructor(private store: Store) {
		this.months = [
			new MonthlyAccountOverviewViewModel(new Date(2021, 1,  1), 10000, 8000, 150)
		]
	}

  ngOnInit(): void {
		this.store.select(selectRegularIncomesSum)
			.pipe(takeUntil(this._ngDestroyed$))
			.subscribe((sumOfRegulars: number) => this._regularIncomesSum = sumOfRegulars);

		this.store.select(selectRegularSpendingsSumPerMonth)
			.pipe(takeUntil(this._ngDestroyed$))
			.subscribe((sumOfRegulars: number) => this._regularSpendingsSum = sumOfRegulars);
  
  }

	ngOnDestroy(): void {
		this._ngDestroyed$.next(undefined);
	}

	displayMonth(date: Date) {
		let options: Intl.DateTimeFormatOptions = {month: 'short'};
		return new Intl.DateTimeFormat('de-DE', options).format(date); 
	}

	getIncomesOfMonth(monthlyOverview: MonthlyAccountOverviewViewModel): number {
		return this._regularIncomesSum;
	}

	getSpendingsOfMonth(monthlyOverview: MonthlyAccountOverviewViewModel): number {
		return this._regularSpendingsSum;
	}

}

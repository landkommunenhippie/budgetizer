import { Component, OnInit } from '@angular/core';
import { MonthlyOverview } from '../../models/monthly-overview.model';
import { EditableTableDescrption } from 'src/app/shared/models/editable-table-description.model';

@Component({
  selector: 'app-year-budget-overview',
  templateUrl: './year-budget-overview.component.html',
  styleUrls: ['./year-budget-overview.component.scss']
})
export class YearBudgetOverviewComponent implements OnInit {
	
	months: MonthlyOverview[];
	displayedColumns: string[] = ['month', 'income', 'spending', 'accountAtStart', 'accountAtEnd', 'saving'];
	tableDescription: EditableTableDescrption[] = [
		{label: 'Monat', valuePropertyName: 'month', valueInputType: 'date', editable: true, displayProcessor: this.displayMonth},
		{label: 'Einnahmen', valuePropertyName: 'income',valueInputType: 'number', editable: false},
		{label: 'Ausgaben', valuePropertyName: 'spending',valueInputType: 'number', editable: false},
		{label: 'Kontostand Monatsbeginn', valuePropertyName: 'accountAtStart',valueInputType: 'number', editable: true},
		{label: 'Kontostand Monatsende', valuePropertyName: 'accountAtEnd',valueInputType: 'number', editable: true},
		{label: 'Sparen', valuePropertyName: 'saving',valueInputType: 'number', editable: true}
	]
	monthlyConscConsctructor = () => new MonthlyOverview(new Date(), 0, 0);
	
  constructor() {
		this.months = [
			new MonthlyOverview(new Date(2021, 1,  1), 6000, 3000)
		]
	}

  ngOnInit(): void {
  }

	displayMonth(date: Date) {
		let options: Intl.DateTimeFormatOptions = {month: 'short'};
		return new Intl.DateTimeFormat('de-DE', options).format(date); 
	}

}

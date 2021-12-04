import { Component, OnInit } from '@angular/core';
import { MonthlyOverview } from '../../models/monthly-overview.model';
import * as Moment from 'moment';

@Component({
  selector: 'app-year-budget-overview',
  templateUrl: './year-budget-overview.component.html',
  styleUrls: ['./year-budget-overview.component.scss']
})
export class YearBudgetOverviewComponent implements OnInit {
	
	months: MonthlyOverview[];
	displayedColumns: string[] = ['month', 'income', 'spending', 'accountAtStart', 'accountAtEnd', 'saving'];

  constructor() {
		this.months = [
			new MonthlyOverview(Moment("01.02.2021"), 6000, 3000)
		]
	}

  ngOnInit(): void {
  }

}

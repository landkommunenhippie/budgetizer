import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'
import { selectRegularIncomes } from 'src/app/core/state/income.selector';
import { selectRegularSpendings } from 'src/app/core/state/spending.selector';
import { selectMonthlyAccountOverviews } from 'src/app/core/state/account.selector';

@Component({
  selector: 'app-dev-state-counter',
  templateUrl: './dev-state-counter.component.html',
  styleUrls: ['./dev-state-counter.component.scss']
})
export class DevStateCounterComponent implements OnInit {
	
	regularIncomes: string[] = [];
	regularSpendings: string[] = [];
	monthlyAccountOverviews: string[] = [];

  constructor(private store: Store) { }

  ngOnInit(): void {
		this.store.select(selectRegularIncomes).subscribe((incomes) => this.regularIncomes = incomes.map(income => JSON.stringify(income)));
		this.store.select(selectRegularSpendings).subscribe((spendings) => this.regularSpendings = spendings.map(spending => JSON.stringify(spending)));
		this.store.select(selectMonthlyAccountOverviews).subscribe((monthlyAccountOverviews) => this.monthlyAccountOverviews = monthlyAccountOverviews.map(monthlyAccountOverview => JSON.stringify(monthlyAccountOverview)));
	}

}

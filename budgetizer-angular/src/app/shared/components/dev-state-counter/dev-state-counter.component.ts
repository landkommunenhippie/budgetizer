import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'
import { selectOneTimeIncomes, selectRegularIncomes } from 'src/app/core/state/income.selector';
import { selectOneTimeSpendings, selectRegularSpendings } from 'src/app/core/state/spending.selector';
import { selectMonthlyAccountOverviews } from 'src/app/core/state/account.selector';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dev-state-counter',
  templateUrl: './dev-state-counter.component.html',
  styleUrls: ['./dev-state-counter.component.scss']
})
export class DevStateCounterComponent implements OnInit {
	
	regularIncomes: string[] = [];
	oneTimeIncomes: string[] = [];
	regularSpendings: string[] = [];
	oneTimeSpendings: string[] = [];
	monthlyAccountOverviews: string[] = [];
	stateDebugEnabled = environment.stateDebugEnabled;
  constructor(private store: Store) { }

  ngOnInit(): void {
		this.store.select(selectRegularIncomes).subscribe((incomes) => this.regularIncomes = incomes.map(income => JSON.stringify(income)));
		this.store.select(selectOneTimeIncomes).subscribe((incomes) => this.oneTimeIncomes = incomes.map(income => JSON.stringify(income)));
		this.store.select(selectRegularSpendings).subscribe((spendings) => this.regularSpendings = spendings.map(spending => JSON.stringify(spending)));
		this.store.select(selectOneTimeSpendings).subscribe((spendings) => this.oneTimeSpendings = spendings.map(spending => JSON.stringify(spending)));
		this.store.select(selectMonthlyAccountOverviews).subscribe((monthlyAccountOverviews) => this.monthlyAccountOverviews = monthlyAccountOverviews.map(monthlyAccountOverview => JSON.stringify(monthlyAccountOverview)));
	}

}

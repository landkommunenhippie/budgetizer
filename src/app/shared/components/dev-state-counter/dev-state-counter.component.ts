import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'
import { selectRegularIncomes } from 'src/app/domain/income/state/regular-income.selector';
@Component({
  selector: 'app-dev-state-counter',
  templateUrl: './dev-state-counter.component.html',
  styleUrls: ['./dev-state-counter.component.scss']
})
export class DevStateCounterComponent implements OnInit {
	
	regularIncomesSize: number = 0;

  constructor(private store: Store) { }

  ngOnInit(): void {
		this.store.select(selectRegularIncomes).subscribe((incomes) => this.regularIncomesSize = incomes.length);
	}

}

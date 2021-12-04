import { Component, OnInit } from '@angular/core';
import { RegularSpending } from '../../models/regular-spending.model';

@Component({
  selector: 'app-regular-spending',
  templateUrl: './regular-spending.component.html',
  styleUrls: ['./regular-spending.component.scss']
})
export class RegularSpendingComponent implements OnInit {
	regularSpendings: RegularSpending[];
	displayedColumns: string[] = ['name', 'description', 'spendingMonthly', 'spendingAnually'];
  
  constructor() {
		this.regularSpendings = [
			{name: 'Miete', description: 'zum Beginn des Monats', spendingMonthly: 1000},
			{name: 'KiGa', description: 'Viel zu teuer', spendingMonthly: 400},
			{name: 'Haftpflicht', description: 'Mal wechseln', spendingAnually: 200}
		];
	}

  ngOnInit(): void {
		
  }

}

import { Component, OnInit } from '@angular/core';
import { RegularIncome } from '../../models/regular-income.model';

@Component({
  selector: 'app-regular-income',
  templateUrl: './regular-income.component.html',
  styleUrls: ['./regular-income.component.scss']
})
export class RegularIncomeComponent implements OnInit {

	regularIncomes: RegularIncome[] = [];
	displayedColumns: string[] = ['name', 'description', 'income'];
  constructor() { }

  ngOnInit(): void {
		this.regularIncomes = [
			{name: 'Lohn', description: 'zum ende des Monats', income: 6000},
			{name: 'Lohn', description: 'zum ende des Monats', income: 6000},
			{name: 'Lohn', description: 'zum ende des Monats', income: 6000},
			{name: 'Lohn', description: 'zum ende des Monats', income: 6000},
			{name: 'Lohn', description: 'zum ende des Monats', income: 6000},
			{name: 'Lohn', description: 'zum ende des Monats', income: 6000},
			{name: 'Lohn', description: 'zum ende des Monats', income: 6000},
			{name: 'Lohn', description: 'zum ende des Monats', income: 6000},
			{name: 'Lohn', description: 'zum ende des Monats', income: 6000},
			{name: 'Lohn', description: 'zum ende des Monats', income: 6000},
			{name: 'Lohn', description: 'zum ende des Monats', income: 6000},
			{name: 'Kindergeld', description: 'Mitte des Monats', income: 420}
		];
  }

}

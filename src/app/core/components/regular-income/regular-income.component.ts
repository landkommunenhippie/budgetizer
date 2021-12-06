import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RegularIncome, regularIncomeConst } from '../../models/regular-income.model';
import { EditableTableDescrption } from 'src/app/shared/model/editable-table-description.model';

@Component({
  selector: 'app-regular-income',
  templateUrl: './regular-income.component.html',
  styleUrls: ['./regular-income.component.scss']
})
export class RegularIncomeComponent implements OnInit {

	regularIncomes: RegularIncome[] = [];
	tableDescription: EditableTableDescrption[] = [
		{label: 'Name', valuePropertyName: 'name', valueInputType: 'text', editable: true},
		{label: 'Beschreibung', valuePropertyName: 'description',valueInputType: 'text', editable: true},
		{label: 'Einkommenshöhe', valuePropertyName: 'income',valueInputType: 'number', editable: true}
	]
	regularIncomeConstructor = regularIncomeConst;
	
	constructor() { 
		this.regularIncomes = [
			{name: 'Lohn', description: 'zum ende des Monats', income: 6000},
			{name: 'Kindergeld', description: 'Mitte des Monats', income: 420}
		];

	}

  ngOnInit(): void {
  }
}

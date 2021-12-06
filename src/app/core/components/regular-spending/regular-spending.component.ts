import { Component, OnInit } from '@angular/core';
import { EditableTableDescrption } from 'src/app/shared/model/editable-table-description.model';
import { RegularSpending, regularSpendingConst } from '../../models/regular-spending.model';

@Component({
  selector: 'app-regular-spending',
  templateUrl: './regular-spending.component.html',
  styleUrls: ['./regular-spending.component.scss']
})
export class RegularSpendingComponent implements OnInit {
	regularSpendings: RegularSpending[];
	tableDescription: EditableTableDescrption[] = [
		{label: 'Name', valuePropertyName: 'name', valueInputType: 'text', editable: true},
		{label: 'Beschreibung', valuePropertyName: 'description',valueInputType: 'text', editable: true},
		{label: 'Ausgabenhöhe Monatlich', valuePropertyName: 'spendingMonthly',valueInputType: 'number', editable: true},
		{label: 'Ausgabenhöhe Jährlich', valuePropertyName: 'spendingAnually',valueInputType: 'number', editable: true}
	]
	regularSpendingConsctructor = regularSpendingConst;

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

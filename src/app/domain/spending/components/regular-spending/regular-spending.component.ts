import { Component, OnInit } from '@angular/core';
import { EditableTableDescrption } from 'src/app/shared/models/editable-table-description.model';
import { RegularSpending, regularSpendingConst } from '../../models/regular-spending.model';
import { Store } from '@ngrx/store';
import { selectRegularSpendings } from '../../../../core/state/spending.selector';
import { regularSpendingsModified } from '../../state/regular-spending.action';


@Component({
  selector: 'app-regular-spending',
  templateUrl: './regular-spending.component.html',
  styleUrls: ['./regular-spending.component.scss']
})
export class RegularSpendingComponent implements OnInit {
	regularSpendings: RegularSpending[] = [];
	tableDescription: EditableTableDescrption[] = [
		{label: 'Name', valuePropertyName: 'name', valueInputType: 'text', editable: true},
		{label: 'Beschreibung', valuePropertyName: 'description',valueInputType: 'text', editable: true},
		{label: 'Ausgabenhöhe Monatlich', valuePropertyName: 'spendingMonthly',valueInputType: 'number', editable: true},
		{label: 'Ausgabenhöhe Jährlich', valuePropertyName: 'spendingAnually',valueInputType: 'number', editable: true}
	]
	regularSpendingConsctructor = regularSpendingConst;

  constructor(private store: Store) {	}

  ngOnInit(): void {
		this.store.select(selectRegularSpendings)
		.subscribe((spendings) => this.regularSpendings = spendings);
  }

	updateRegularIncomes(regularSpendings: RegularSpending[]):void {
		this.store.dispatch(regularSpendingsModified({regularSpendings}));
	}

}

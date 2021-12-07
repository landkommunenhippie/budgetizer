import { Component, OnInit } from '@angular/core';
import { RegularIncome, regularIncomeConst } from '../../models/regular-income.model';
import { EditableTableDescrption } from 'src/app/shared/models/editable-table-description.model';
import { Store } from '@ngrx/store';
import { selectRegularIncomes } from '../../state/regular-income.selector';
import { RegularIncomeService } from '../../services/regular-income.service';
import { regularIncomesModified } from '../../state/regular-income.action';

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
	
	constructor(private store: Store, private regulareIncomeService: RegularIncomeService) { }

  ngOnInit(): void {
		this.store.select(selectRegularIncomes).subscribe((incomes) => this.regularIncomes = incomes);
	}

	updateRegularIncomes(regularIncomes: RegularIncome[]):void {
		this.store.dispatch(regularIncomesModified({regularIncomes}));
	}
}

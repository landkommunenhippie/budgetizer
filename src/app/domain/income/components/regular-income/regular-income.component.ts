import { Component, OnDestroy, OnInit } from '@angular/core';
import { RegularIncome, regularIncomeConst } from '../../models/regular-income.model';
import { EditableTableDescrption } from 'src/app/shared/models/editable-table-description.model';
import { Store } from '@ngrx/store';
import { selectRegularIncomes } from '../../../../core/state/income.selector';
import { regularIncomesModified } from '../../state/regular-income.action';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-regular-income',
  templateUrl: './regular-income.component.html',
  styleUrls: ['./regular-income.component.scss']
})
export class RegularIncomeComponent implements OnInit, OnDestroy {

	regularIncomes: RegularIncome[] = [];
	tableDescription: EditableTableDescrption[] = [
		{label: 'Name', valuePropertyName: 'name', valueInputType: 'text', editable: true},
		{label: 'Beschreibung', valuePropertyName: 'description',valueInputType: 'text', editable: true},
		{label: 'Einkommenshöhe', valuePropertyName: 'income',valueInputType: 'number', editable: true}
	]
	emptyItemFactory = regularIncomeConst;
	public ngDestroyed$ = new Subject();

	
	constructor(private store: Store) { }
	
  ngOnInit(): void {
		this.store.select(selectRegularIncomes)
			.pipe(takeUntil(this.ngDestroyed$))
			.subscribe((incomes) => this.regularIncomes = incomes);
	}

	ngOnDestroy(): void {
		this.ngDestroyed$.next(undefined);
	}

	updateRegularIncomes(regularIncomes: RegularIncome[]):void {
		this.store.dispatch(regularIncomesModified({regularIncomes}));
	}
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { RegularIncomeViewModel, regularIncomeConst } from '../../models/regular-income-view.model';
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

	regularIncomes: RegularIncomeViewModel[] = [];
	tableDescription: EditableTableDescrption[] = [
		{label: 'Name', valuePropertyName: 'name', valueInputType: 'text', editable: true},
		{label: 'Beschreibung', valuePropertyName: 'description',valueInputType: 'text', editable: true},
		{label: 'Einkommenshöhe', valuePropertyName: 'income',valueInputType: 'number', editable: true},
		{label: 'Gültig von', valuePropertyName: 'startDate',valueInputType: 'date', editable: true, displayProcessor: this.displayDate},
		{label: 'Gültig bis', valuePropertyName: 'endDate',valueInputType: 'date', editable: true, displayProcessor: this.displayDate}
	]
	emptyItemFactory = regularIncomeConst;
	private ngDestroyed$ = new Subject();
	
	constructor(private store: Store) { }
	
  ngOnInit(): void {
		this.store.select(selectRegularIncomes)
			.pipe(takeUntil(this.ngDestroyed$))
			.subscribe((incomes) => this.regularIncomes = incomes.map(income => RegularIncomeViewModel.createBy(income)));
	}

	ngOnDestroy(): void {
		this.ngDestroyed$.next(undefined);
	}

	updateRegularIncomes(regularIncomeViews: RegularIncomeViewModel[]):void {
		let regularIncomes = regularIncomeViews.map(regIncomeViewModel => regIncomeViewModel.toRegularIncome())
		this.store.dispatch(regularIncomesModified({regularIncomes}));
	}

	displayDate(date: Date|string) {
		if (date === undefined || date === null) {
			return undefined;
		}
		
		let options: Intl.DateTimeFormatOptions = {dateStyle: 'medium'};
		let dateToParse: Date = typeof date === 'string' ?  new Date(date) : date;
		
		return new Intl.DateTimeFormat('de-DE', options).format(dateToParse); 
	}
}

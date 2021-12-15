import { Component, OnDestroy, OnInit } from '@angular/core';
import { OneTimeIncome } from 'src/app/core/models/states.model';
import { oneTimeIncomeCons, OneTimeIncomeViewModel } from 'src/app/domain/income/models/one-time-income-view.model';
import { EditableTableDescrption } from 'src/app/shared/models/editable-table-description.model';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { selectOneTimeIncomes } from 'src/app/core/state/income.selector';
import { oneTimeIncomesModified } from '../../state/one-time-income.action';

@Component({
  selector: 'app-one-time-income',
  templateUrl: './one-time-income.component.html',
  styleUrls: ['./one-time-income.component.scss']
})
export class OneTimeIncomeComponent implements OnInit, OnDestroy {

	oneTimeIncomes: OneTimeIncomeViewModel[] = []
	tableDescription: EditableTableDescrption[] = [
		{label: 'Name', valuePropertyName: 'name', valueInputType: 'text', editable: true},
		{label: 'Beschreibung', valuePropertyName: 'description',valueInputType: 'text', editable: true},
		{label: 'Einnahmedatum', valuePropertyName: 'date', valueInputType: 'date', editable: true, displayProcessor: this.displayDate},
		{label: 'Einkommenshöhe', valuePropertyName: 'income',valueInputType: 'number', editable: true}
	]
	emptyItemFactory = oneTimeIncomeCons;
	private ngDestroyed$ = new Subject();

  constructor(private _store: Store) { }

  ngOnInit(): void {
		this._store.select(selectOneTimeIncomes)
			.pipe(takeUntil(this.ngDestroyed$))
			.subscribe((oneTimeIncomes) => this.oneTimeIncomes = oneTimeIncomes.map(oneTimeIncome => OneTimeIncomeViewModel.createBy(oneTimeIncome)));
	}

	ngOnDestroy(): void {
		this.ngDestroyed$.next(undefined);
	}

	updateOneTimeIncomes(oneTimeIncomeViews: OneTimeIncomeViewModel[]):void {
		let oneTimeIncomes: OneTimeIncome[] =  oneTimeIncomeViews.map(oneTimeIncomeView => oneTimeIncomeView.toOneTimeIncome())
		this._store.dispatch(oneTimeIncomesModified({oneTimeIncomes}));
	}

	displayDate(date: Date|string) {
		let options: Intl.DateTimeFormatOptions = {dateStyle: 'medium'};
		let dateToParse: Date = typeof date === 'string' ?  new Date(date) : date;
		
		return new Intl.DateTimeFormat('de-DE', options).format(dateToParse); 
	}
}

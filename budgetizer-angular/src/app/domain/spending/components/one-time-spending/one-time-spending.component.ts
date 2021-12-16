import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { OneTimeSpending } from 'src/app/core/models/states.model';
import { selectOneTimeSpendings } from 'src/app/core/state/spending.selector';
import { EditableTableDescrption } from 'src/app/shared/models/editable-table-description.model';
import { oneTimeSpendingConst, OneTimeSpendingView as OneTimeSpendingViewModel } from '../../models/one-time-spending-view.model';
import { oneTimeSpendingsModified } from '../../state/one-time-spending.action';

@Component({
  selector: 'app-one-time-spending',
  templateUrl: './one-time-spending.component.html',
  styleUrls: ['./one-time-spending.component.scss']
})
export class OneTimeSpendingComponent implements OnInit, OnDestroy {
	
	oneTimeSpendings: OneTimeSpendingViewModel[] = [];
  tableDescription: EditableTableDescrption[] = [
		{label: 'Name', valuePropertyName: 'name', valueInputType: 'text', editable: true},
		{label: 'Beschreibung', valuePropertyName: 'description',valueInputType: 'text', editable: true},
		{label: 'Einnahmedatum', valuePropertyName: 'date', valueInputType: 'date', editable: true, displayProcessor: this.displayDate},
		{label: 'Ausgabenhöhe', valuePropertyName: 'spending',valueInputType: 'number', editable: true}
	]
	emptyItemFactory = oneTimeSpendingConst;
	private ngDestroyed$ = new Subject();

  constructor(private _store: Store) { }

  ngOnInit(): void {
		this._store.select(selectOneTimeSpendings)
			.pipe(takeUntil(this.ngDestroyed$))
			.subscribe((oneTimeSpendings) => this.oneTimeSpendings = oneTimeSpendings.map(oneTimeIncome => OneTimeSpendingViewModel.createBy(oneTimeIncome)));
	}

	ngOnDestroy(): void {
		this.ngDestroyed$.next(undefined);
	}

	updateOneTimeSpendings(oneTimeSpendingViews: OneTimeSpendingViewModel[]):void {
		let oneTimeSpendings: OneTimeSpending[] =  oneTimeSpendingViews.map(oneTimeIncomeView => oneTimeIncomeView.toOneTimeSpending())
		this._store.dispatch(oneTimeSpendingsModified({ oneTimeSpendings }));
	}

	displayDate(date: Date|string) {
		let options: Intl.DateTimeFormatOptions = {dateStyle: 'medium'};
		let dateToParse: Date = typeof date === 'string' ?  new Date(date) : date;
		
		return new Intl.DateTimeFormat('de-DE', options).format(dateToParse); 
	}

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { EditableTableDescrption } from 'src/app/shared/models/editable-table-description.model';
import { RegularSpendingViewModel, regularSpendingConst } from '../../models/regular-spending-view.model';
import { Store } from '@ngrx/store';
import { selectRegularSpendings } from '../../../../core/state/spending.selector';
import { regularSpendingsModified } from '../../state/regular-spending.action';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-regular-spending',
  templateUrl: './regular-spending.component.html',
  styleUrls: ['./regular-spending.component.scss']
})
export class RegularSpendingComponent implements OnInit, OnDestroy {
	
	regularSpendings: RegularSpendingViewModel[] = [];
	tableDescription: EditableTableDescrption[] = [
		{label: 'Name', valuePropertyName: 'name', valueInputType: 'text', editable: true},
		{label: 'Beschreibung', valuePropertyName: 'description',valueInputType: 'text', editable: true},
		{label: 'Monatlich', valuePropertyName: 'spendingMonthly',valueInputType: 'number', editable: true},
		{label: 'Jährlich', valuePropertyName: 'spendingAnually',valueInputType: 'number', editable: true},
		{label: 'Abrechnung Monatlich', valuePropertyName: 'monthly',valueInputType: 'check', editable: true, displayProcessor: this.showMonthly},
		{label: 'Gültig von', valuePropertyName: 'startDate',valueInputType: 'date', editable: true, displayProcessor: this.displayDate, sortable: true},
		{label: 'Gültig bis', valuePropertyName: 'endDate',valueInputType: 'date', editable: true, displayProcessor: this.displayDate}

	]
	emptyItemFactory = regularSpendingConst;
	public ngDestroyed$ = new Subject();

  constructor(private store: Store) {	}

  ngOnInit(): void {
		this.store.select(selectRegularSpendings)
			.pipe(takeUntil(this.ngDestroyed$))
			.subscribe((spendings) => this.regularSpendings = spendings.map(spending => RegularSpendingViewModel.createBy(spending)));
  }

	ngOnDestroy(): void {
		this.ngDestroyed$.next(undefined);
	}

	updateRegularSpengings(regularSpendingViews: RegularSpendingViewModel[]):void {
		let regularSpendings = regularSpendingViews.map(spendingView => spendingView.toInterface());
		this.store.dispatch(regularSpendingsModified({ regularSpendings }));
	}

	displayDate(date: Date|string) {
		if (date === undefined || date === null) {
			return undefined;
		}
		
		let options: Intl.DateTimeFormatOptions = {dateStyle: 'medium'};
		let dateToParse: Date = typeof date === 'string' ?  new Date(date) : date;
		
		return new Intl.DateTimeFormat('de-DE', options).format(dateToParse); 
	}

	showMonthly(monthly: boolean) {
		if(monthly) {
			return 'Monatlich'
		}
		return '';
	}
}

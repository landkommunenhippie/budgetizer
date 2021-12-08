/**
 * angular
*/
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';


/**
 * angular material
*/
import { MatTableModule } from '@angular/material/table'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

/**
 * Custom 
*/
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegularIncomeComponent } from './domain/income/components/regular-income/regular-income.component';
import { YearBudgetOverviewComponent } from './domain/budget/components/year-budget-overview/year-budget-overview.component';
import { RegularSpendingComponent } from './domain/spending/components/regular-spending/regular-spending.component';
import { ItemAdderComponent } from './shared/components/item-adder/item-adder.component';
import { EditableTableComponent } from './shared/components/editable-table/editable-table.component'
import { DevStateCounterComponent } from './shared/components/dev-state-counter/dev-state-counter.component'

/**
 * State
*/
import { StoreModule } from '@ngrx/store';
import { regularIncomeReducer } from './domain/income/state/regular-income.reducer'
import { regularSpendingReducer } from './domain/spending/state/regular-spending.reducer'

/**
 * SERVICES
*/
import { RegularIncomeService } from './domain/income/services/regular-income.service';
import { RegularSpendingService } from './domain/spending/services/regular-spending.service';

export function initApp(
	regularIncomeService: RegularIncomeService,
	regularSpendingService: RegularSpendingService) {
	return () => {
		regularIncomeService.loadRegularIncomes();
		regularSpendingService.loadRegularSpendings();
	};
}
@NgModule({
  declarations: [
    AppComponent,
    RegularIncomeComponent,
    YearBudgetOverviewComponent,
    RegularSpendingComponent,
    ItemAdderComponent,
    EditableTableComponent,
    DevStateCounterComponent,
  ],
  imports: [
    BrowserModule,
		FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
		FlexLayoutModule,
		MatTableModule,
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
		MatGridListModule,
		MatInputModule,
		MatDatepickerModule,
		MatNativeDateModule,
		StoreModule.forRoot({regularIncomes: regularIncomeReducer, regularSpendings: regularSpendingReducer })
  ],
  providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: initApp,
			deps: [RegularIncomeService, RegularSpendingService],
			multi: true
		}

	],
  bootstrap: [AppComponent]
})
export class AppModule { 
	constructor() {
		registerLocaleData(localeDe, 'de-DE', localeDeExtra);
	}
}

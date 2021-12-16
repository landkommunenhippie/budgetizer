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
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';

/**
 * Custom 
*/
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegularIncomeComponent } from './domain/income/components/regular-income/regular-income.component';
import { YearAccountOverviewComponent } from './domain/account/components/year-account-overview/year-account-overview.component';
import { RegularSpendingComponent } from './domain/spending/components/regular-spending/regular-spending.component';
import { ItemAdderComponent } from './shared/components/item-adder/item-adder.component';
import { EditableTableComponent } from './shared/components/editable-table/editable-table.component'
import { DevStateCounterComponent } from './shared/components/dev-state-counter/dev-state-counter.component'

/**
 * State
*/
import { StoreModule } from '@ngrx/store';
import { regularIncomeReducer } from './domain/income/state/regular-income.reducer'
import { oneTimeIncomeReducer } from './domain/income/state/one-time-income.reducer'
import { regularSpendingReducer } from './domain/spending/state/regular-spending.reducer'
import { monthlyAccountOverviewReducer } from './domain/account/state/monthly-account-overview.reducer';

/**
 * SERVICES
*/
import { RegularIncomeService } from './domain/income/services/regular-income.service';
import { RegularSpendingService } from './domain/spending/services/regular-spending.service';
import { MonthlyAccountOverviewService } from './domain/account/service/monthly-account-overview.service';
import { HttpClientModule } from '@angular/common/http';
import { IncomeTabViewComponent } from './domain/income/components/income-tab-view/income-tab-view.component';
import { OneTimeIncomeComponent } from './domain/income/components/one-time-income/one-time-income.component';
import { OneTimeIncomeService } from './domain/income/services/one-time-income.service';
import { SpendingTabViewComponent } from './domain/spending/components/spending-tab-view/spending-tab-view.component';

export function initApp(
	regularIncomeService: RegularIncomeService,
	oneTimeInvomceService: OneTimeIncomeService,
	regularSpendingService: RegularSpendingService,
	monthlyAccountOverviewService: MonthlyAccountOverviewService) {
	return () => {
		regularIncomeService.loadRegularIncomes();
		oneTimeInvomceService.loadOneTimeIncomes();
		regularSpendingService.loadRegularSpendings();
		monthlyAccountOverviewService.loadMonthlyAccountOverviews();
	};
}
@NgModule({
  declarations: [
    AppComponent,
    RegularIncomeComponent,
    YearAccountOverviewComponent,
    RegularSpendingComponent,
    ItemAdderComponent,
    EditableTableComponent,
    DevStateCounterComponent,
    IncomeTabViewComponent,
    OneTimeIncomeComponent,
    SpendingTabViewComponent,
  ],
  imports: [
    BrowserModule,
		FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
		FlexLayoutModule,
		HttpClientModule,
		MatTableModule,
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
		MatGridListModule,
		MatInputModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatSnackBarModule,
		MatTabsModule,
		StoreModule.forRoot({regularIncomes: regularIncomeReducer, oneTimeIncomes: oneTimeIncomeReducer, regularSpendings: regularSpendingReducer, monthlyAccountOverviews: monthlyAccountOverviewReducer })
  ],
  providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: initApp,
			deps: [RegularIncomeService, OneTimeIncomeService, RegularSpendingService, MonthlyAccountOverviewService],
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

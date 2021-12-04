import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegularIncomeComponent } from './core/components/regular-income/regular-income.component';
/**
 * DEPRECATED - is not used atm
*/
const routes: Routes = [
	{path: 'regular-incomes', component: RegularIncomeComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

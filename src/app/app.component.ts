import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  yearOverviewShown = true;
  incomeShown = true;

	public isSecondaryGridShown():boolean {
		return this.incomeShown;
	}
}

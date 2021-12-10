import { Component } from '@angular/core';
import { NotificationService } from './core/service/notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  yearOverviewShown = true;
  incomeShown = false;
  spendingShown = false;

	constructor(private notificationService: NotificationService, private snackBar: MatSnackBar) {
			this.notificationService.notification$.subscribe(message => {
				this.snackBar.open(message, 'x', {duration: 5000});
			});
	}
	public isSecondaryGridShown():boolean {
		return this.incomeShown || this.spendingShown;
	}
}

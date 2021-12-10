import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { regularIncomesFromServer } from "../state/regular-income.action";
import { RegularIncome } from "src/app/core/models/states.model";
import { selectRegularIncomes } from "src/app/core/state/income.selector";
import { HttpClient, HttpEvent, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment'
import { catchError, tap, throwError } from "rxjs";
import { NotificationService } from "src/app/core/service/notification.service";

@Injectable({ providedIn: 'root' })
export class RegularIncomeService {

	private _httpHeader: any = {};
  constructor(
		private store: Store,
		private httpClient: HttpClient,
		private _notificationService: NotificationService) {
			this._httpHeader = {
				headers: new HttpHeaders({
					'Content-Type': 'application/json'
				})
		}

	}
	
	/**
	 * Procedure to load initial regularIncomes and store them
	 * Dummy Impl for developing
	 * Replace with HTTP-Call later
	 * 
	*/
  loadRegularIncomes(): void {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		}
    this.httpClient.get<RegularIncome[]>(`${environment.apiUrl}/tst/regular-incomes`,  <Object>options)
			.pipe(
				catchError(
					(error) => { console.log("ERROR", error); this._notificationService.notification$.next('Einkommen konnten nicht geladen werden'); return throwError(() => new Error('Sync failed')); }
				) 
			).subscribe(
				(regularIncomes: RegularIncome[]) => {
					
					this.store.dispatch(regularIncomesFromServer({ regularIncomes }));
					
					this.store.select(selectRegularIncomes)
						.subscribe((incomes) => { this.syncRegularIncomes(incomes) } );
				}
			);
  }

	syncRegularIncomes(regularIncomes: RegularIncome[]) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			}),
			responseType: 'text'
		}
		this.httpClient.put<RegularIncome[]>(`${environment.apiUrl}/tst/regular-incomes`, JSON.stringify(regularIncomes), <Object>options)
		.pipe(
			catchError(
				(error) => { console.log("ERROR", error); this._notificationService.notification$.next('Einkommen konnten nicht synchronisiert werden'); return throwError(() => new Error('Sync failed')); }
			) 
		).subscribe(
			response => console.log("DONE", response)
		);
	}
}
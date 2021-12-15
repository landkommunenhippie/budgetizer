import { Injectable } from "@angular/core";
import { RegularIncome } from "src/app/core/models/states.model";
import { HttpClient, HttpEvent, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment'
import { catchError, throwError } from "rxjs";
import { NotificationService } from "src/app/core/service/notification.service";

@Injectable({ providedIn: 'root' })
export class HttpService {
	constructor(
		private httpClient: HttpClient,
		private _notificationService: NotificationService) { }
	
	/**
	 * Method to do http GET requests.
	 * callback method is called with results
	 * 
	 * If an error occures an event for notification will be emitted
	 * 
	*/
  doGetAndApply(requestPath: string, responseCallback: Function): void {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		}
    this.httpClient.get<RegularIncome[]>(`${environment.apiUrl}/${requestPath}`,  <Object>options)
			.pipe(
				catchError(
					(error) => { console.log("ERROR", error); this._notificationService.notification$.next('Einkommen konnten nicht geladen werden'); return throwError(() => new Error('Sync failed')); }
				) 
			).subscribe(
				(regularIncomes: RegularIncome[]) => {
					responseCallback(regularIncomes);
				}
			);
  }

	/**
	 * Method to do http PUT requests.
	 * requestPayload is expected as JSON and will be stringified.
	 * 
	 * If an error occures an event for notification will be emitted
	 * 
	*/
	doPut(requestPath: string, requestPaylod: object) {
		let options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			}),
			responseType: 'text'
		}
		this.httpClient.put<RegularIncome[]>(`${environment.apiUrl}/${requestPath}`, JSON.stringify(requestPaylod), <Object>options)
		.pipe(
			catchError(
				(error) => { console.log("ERROR", error); this._notificationService.notification$.next('Einkommen konnten nicht synchronisiert werden'); return throwError(() => new Error('Sync failed')); }
			) 
		).subscribe(
			response => console.log("DONE", response)
		);
	}
}
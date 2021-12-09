import { createAction, props } from '@ngrx/store'
import { RegularSpending } from 'src/app/core/models/states.model'

export const regularSpendingsFromServer = createAction(
	'[Regular-Spending List From Server] Regular-Spendings loaded from Server',
	props<{ regularSpendings: RegularSpending[] }>()
)

export const regularSpendingsModified = createAction(
	'[Regular-Income Spending] Regular-Spendings modified',
	props<{ regularSpendings: RegularSpending[] }>()
)
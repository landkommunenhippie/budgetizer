import { createAction, props } from '@ngrx/store'
import { OneTimeSpending } from 'src/app/core/models/states.model'

export const oneTimeSpendingsFromServer = createAction(
	'[One-Time-Spending List From Server] One-Time-Spendings loaded from Server',
	props<{ oneTimeSpendings: OneTimeSpending[] }>()
)

export const oneTimeSpendingsModified = createAction(
	'[One-Time-Spending Spending] One-Time-Spendings modified',
	props<{ oneTimeSpendings: OneTimeSpending[] }>()
)
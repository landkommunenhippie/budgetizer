import { createAction, props } from '@ngrx/store'
import { OneTimeIncome } from 'src/app/core/models/states.model'

export const oneTimeIncomesFromServer = createAction(
	'[One-Time-Income List From Server] One-Time-Incomes loaded from Server',
	props<{ oneTimeIncomes: OneTimeIncome[] }>()
)

export const oneTimeIncomesModified = createAction(
	'[One-Time-Income List] One-Time-Incomes modified',
	props<{ oneTimeIncomes: OneTimeIncome[] }>()
)
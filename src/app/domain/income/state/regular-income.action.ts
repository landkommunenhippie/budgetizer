import { createAction, props } from '@ngrx/store'
import { RegularIncome } from 'src/app/core/models/states.model'

export const regularIncomesFromServer = createAction(
	'[Regular-Income List From Server] Regular-Incomes loaded from Server',
	props<{ regularIncomes: RegularIncome[] }>()
)

export const regularIncomesModified = createAction(
	'[Regular-Income List] Regular-Incomes modified',
	props<{ regularIncomes: RegularIncome[] }>()
)
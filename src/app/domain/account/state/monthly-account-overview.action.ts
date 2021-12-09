import { createAction, props } from '@ngrx/store'
import { MonthlyAccountOverview } from 'src/app/core/models/states.model'

export const monthlyAccountOverviewsFromServer = createAction(
	'[Monthly-Account-Overview List From Server] Monthly-Account-Overviews loaded from Server',
	props<{ monthlyAccountOverviews: MonthlyAccountOverview[] }>()
)

export const monthlyAccountOverviewsModified = createAction(
	'[Monthly-Account-Overview Spending] Monthly-Account-Overviews modified',
	props<{ monthlyAccountOverviews: MonthlyAccountOverview[] }>()
)
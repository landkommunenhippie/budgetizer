import { createReducer, on } from '@ngrx/store';
import { MonthlyAccountOverview } from 'src/app/core/models/states.model';
import { monthlyAccountOverviewsModified, monthlyAccountOverviewsFromServer } from './monthly-account-overview.action'

export const initialState: MonthlyAccountOverview[] = [];

export const monthlyAccountOverviewReducer = createReducer(
	initialState,
	on(
		monthlyAccountOverviewsModified,
		monthlyAccountOverviewsFromServer,
		(state, {monthlyAccountOverviews}) => (monthlyAccountOverviews)
	)
)

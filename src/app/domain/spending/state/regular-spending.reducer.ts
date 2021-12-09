import { createReducer, on } from '@ngrx/store';
import { RegularSpending } from 'src/app/core/models/states.model';
import { regularSpendingsModified, regularSpendingsFromServer } from './regular-spending.action'

export const initialState: RegularSpending[] = [];

export const regularSpendingReducer = createReducer(
	initialState,
	on(
		regularSpendingsModified,
		regularSpendingsFromServer,
		(state, {regularSpendings}) => (regularSpendings)
	)
)

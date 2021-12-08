import { createReducer, on } from '@ngrx/store';
import { RegularSpending } from '../models/regular-spending.model';
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

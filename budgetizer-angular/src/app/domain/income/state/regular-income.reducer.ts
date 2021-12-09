import { createReducer, on } from '@ngrx/store';
import { RegularIncome } from 'src/app/core/models/states.model';
import { regularIncomesModified, regularIncomesFromServer } from './regular-income.action'

export const initialState: RegularIncome[] = [];

export const regularIncomeReducer = createReducer(
	initialState,
	on(
		regularIncomesModified,
		regularIncomesFromServer,
		(state, {regularIncomes}) => (regularIncomes)
	)
)

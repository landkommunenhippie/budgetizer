import { createReducer, on } from '@ngrx/store';
import { regularIncomesModified, regularIncomesFromServer } from './regular-income.action'
import { IncomeState } from 'src/app/domain/income/state/income.state'

export const regularIncomeReducer = createReducer(
	IncomeState.regularIncomes,
	on(
		regularIncomesModified,
		regularIncomesFromServer,
		(state, {regularIncomes}) => (regularIncomes)
	)
)

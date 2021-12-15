import { createReducer, on } from '@ngrx/store';
import { oneTimeIncomesModified, oneTimeIncomesFromServer } from './one-time-income.action'
import { IncomeState } from 'src/app/domain/income/state/income.state'

export const oneTimeIncomeReducer = createReducer(
	IncomeState.oneTimeIncomes,
	on(
		oneTimeIncomesModified,
		oneTimeIncomesFromServer,
		(state, {oneTimeIncomes}) => (oneTimeIncomes)
	)
)

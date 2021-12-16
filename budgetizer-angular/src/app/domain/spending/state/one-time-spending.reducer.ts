import { createReducer, on } from '@ngrx/store';
import { oneTimeSpendingsFromServer, oneTimeSpendingsModified } from './one-time-spending.action'
import { spendingState} from 'src/app/domain/spending/state/spending.state'

export const oneTimeSpendingReducer = createReducer(
	spendingState.oneTimeSpendings,
	on(
		oneTimeSpendingsModified,
		oneTimeSpendingsFromServer,
		(state, {oneTimeSpendings}) => (oneTimeSpendings)
	)
)

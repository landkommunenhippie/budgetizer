import { createReducer, on } from '@ngrx/store';
import { regularSpendingsModified, regularSpendingsFromServer } from './regular-spending.action'
import { spendingState} from 'src/app/domain/spending/state/spending.state'

export const regularSpendingReducer = createReducer(
	spendingState.regularSpendings,
	on(
		regularSpendingsModified,
		regularSpendingsFromServer,
		(state, {regularSpendings}) => (regularSpendings)
	)
)

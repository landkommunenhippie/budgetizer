export interface RegularSpending {

	name: string,
	description: string,
	spendingMonthly?: number
	spendingAnually?: number
}

/**
 * cnst-func to be able to instantiate an empty regularIncome.
 * Used in view.
*/
export const regularSpendingConst = (): RegularSpending => {
	return { name: '', description: ''};
}

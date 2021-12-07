export interface RegularIncome {

	name: String,
	description: String,
	income: Number

}

/**
 * cnst-func to be able to instantiate an empty regularIncome.
 * Used in view.
*/
export const regularIncomeConst = (): RegularIncome => {
	return { name: '', description: '',  income: 0};
}

export interface RegularIncome {
	name: string,
	description: string,
	income: number
}

export interface RegularSpending {
	name: string,
	description: string,
	spendingMonthly: number
	spendingAnually: number
}

export interface MonthlyAccountOverview {
	month: Date,
	accountAtStart: number,
	accountAtEnd: number,
	saving: number
}
export interface RegularIncome {
	name: string,
	description: string,
	income: number,
	startDate: Date,
	endDate?: Date
}

export interface OneTimeIncome {
	name: string,
	description: string,
	date: Date,
	income: number
}

export interface RegularSpending {
	name: string,
	description: string,
	spendingMonthly: number
	spendingAnually: number
	startDate: Date,
	endDate?: Date
}

export interface OneTimeSpending {
	name: string,
	description: string,
	date: Date,
	spending: number
}


export interface MonthlyAccountOverview {
	month: Date,
	accountAtStart: number,
	accountAtEnd: number,
	saving: number
}
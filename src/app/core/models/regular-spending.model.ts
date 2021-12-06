export class RegularSpending {

	name: string = '';
	description: string = '';
	private _spendingMonthly: number = 0 ;
	private _spendingAnually: number = 0;

	public get spendingMonthly(): number { return this._spendingMonthly; }
	public get spendingAnually(): number { return this._spendingAnually; }

	public set spendingMonthly(spendingMonthly: number) {
		this._spendingMonthly = spendingMonthly;
		this._spendingAnually = spendingMonthly * 12;	
	}


	public set spendingAnually(spendingAnually: number) {
		this._spendingAnually = spendingAnually;
		this._spendingMonthly = spendingAnually / 12;	
	}
}

/**
 * cnst-func to be able to instantiate an empty regularIncome.
 * Used in view.
*/
export const regularSpendingConst = (): RegularSpending => {
	return new RegularSpending() ;
}

export class RegularSpendingBuilder {
	private spending: RegularSpending = new RegularSpending();
	
	public name(name: string) {
		this.spending.name = name;
		return this;
	}

	public description(description: string) {
		this.spending.description = description;
		return this;
	}

	public spendingMonthly(spendingMonthly: number) {
		this.spending.spendingMonthly = spendingMonthly;
		return this;
	}

	public spendingAnually(spendingAnually: number) {
		this.spending.spendingAnually = spendingAnually;
		return this;
	}

	public build() {
		let ret = this.spending;
		this.spending = new RegularSpending();
		return ret;
	}
}

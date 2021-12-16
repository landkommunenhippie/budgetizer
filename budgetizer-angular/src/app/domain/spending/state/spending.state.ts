import { OneTimeSpending, RegularSpending } from "src/app/core/models/states.model";

export class spendingState {
	public static regularSpendings: RegularSpending[] = [];
	public static oneTimeSpendings: OneTimeSpending[] = [];
}
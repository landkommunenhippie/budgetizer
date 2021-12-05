import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RegularIncome } from '../../models/regular-income.model';
import { regularIncomeConst } from 'src/app/core/models/regular-income.model'

@Component({
  selector: 'app-regular-income',
  templateUrl: './regular-income.component.html',
  styleUrls: ['./regular-income.component.scss']
})
export class RegularIncomeComponent implements OnInit {

	regularIncomes: RegularIncome[] = [];
	regularIncomesToEdit: RegularIncome[] = [];
	datasource: MatTableDataSource<RegularIncome>;
	
	displayedColumns: string[] = ['name', 'description', 'income', 'actions'];
	
	isEditMode: boolean[] = [];

	constructor() { 
		this.regularIncomes = [
			{name: 'Lohn', description: 'zum ende des Monats', income: 6000},
			{name: 'Kindergeld', description: 'Mitte des Monats', income: 420}
		];

		this.datasource = new MatTableDataSource(this.regularIncomes)
	}

  ngOnInit(): void {
  }

	addItem(): void {
		this.regularIncomes.push(regularIncomeConst());
		this.toggleEditMode(this.regularIncomes.length - 1);
		this.refreshTable();
	}
	saveItem(index: number):void {
		this.regularIncomes.splice(index, 1, this.regularIncomesToEdit[index]);
		this.refreshTable();
		this.toggleEditMode(index);
	}

	discard(rowIndex: number): void {
		this.toggleEditMode(rowIndex);
	}

	toggleEditMode(rowIndex: number): void {
		this.regularIncomesToEdit[rowIndex] = {...this.regularIncomes[rowIndex]};
		this.isEditMode[rowIndex] = !this.isEditMode[rowIndex];
	}

	delete(index: number): void {
		this.regularIncomes.splice(index, 1);
		this.refreshTable();
	}
	refreshTable(): void {
		this.datasource.data = this.regularIncomes;
	}


}

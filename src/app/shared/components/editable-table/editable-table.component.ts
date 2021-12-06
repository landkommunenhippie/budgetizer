import { Component, Input, OnInit } from '@angular/core';
import { EditableTableDescrption } from '../../model/editable-table-description.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.scss']
})
export class EditableTableComponent implements OnInit {

	@Input('table-data')
	tableData: any[] = [];
	@Input('table-descriptions')
	tableDescriptions: EditableTableDescrption[] = [];
	datasource: MatTableDataSource<any> = new MatTableDataSource(this.tableData);
	displayedColumns = () => this.tableDescriptions.map(descr => descr.valuePropertyName).concat('actions'); 
	hasEditableItems = () => this.tableDescriptions.findIndex(descr => descr.editable) >= 0;

	@Input('table-data-construction-function')
	tableDataConstructionFunction: Function = () => null;

	isEditMode: boolean[] = [];
	tableDataInEditing: any[] = [];
	
  constructor() { }

  ngOnInit(): void {
		this.refreshTable();
  }

	addItem(): void {
		this.tableData.push(this.tableDataConstructionFunction());
		this.toggleEditMode(this.tableData.length - 1);
		this.refreshTable();
	}
	saveItem(index: number):void {
		this.tableData.splice(index, 1, this.tableDataInEditing[index]);
		this.refreshTable();
		this.toggleEditMode(index);
	}

	discard(rowIndex: number): void {
		this.toggleEditMode(rowIndex);
	}

	toggleEditMode(rowIndex: number): void {
		this.isEditMode[rowIndex] = !this.isEditMode[rowIndex];
		if (this.isEditMode[rowIndex]) {
			this.tableDataInEditing[rowIndex] = Object.create(this.tableData[rowIndex]);
		} else {
			this.tableDataInEditing.splice(rowIndex, 1);
		}
		
	}

	delete(index: number): void {
		this.tableData.splice(index, 1);
		this.refreshTable();
	}
	refreshTable(): void {
		this.datasource.data = this.tableData;
	}
}

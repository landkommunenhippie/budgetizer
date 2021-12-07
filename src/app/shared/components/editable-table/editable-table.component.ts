import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EditableTableDescrption } from '../../models/editable-table-description.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.scss'],
})
export class EditableTableComponent implements OnInit {

	private _tableData:any[] = [];
	@Input('table-data') set tableData(incomingtableData: any[]) {
		this._tableData = [...incomingtableData];
		this.refreshTable();
	}
	get tableData() { return this._tableData; }
	@Input('table-descriptions')
	tableDescriptions: EditableTableDescrption[] = [];
	datasource: MatTableDataSource<any> = new MatTableDataSource(this.tableData);
	displayedColumns = () => this.tableDescriptions.map(descr => descr.valuePropertyName).concat('actions'); 
	hasEditableItems = () => this.tableDescriptions.findIndex(descr => descr.editable) >= 0;
	@Input('table-data-construction-function')
	tableDataConstructionFunction: Function = () => null;
	
	@Output('data-modified')
	dataModified = new EventEmitter<any[]>();
	
	isEditMode: boolean[] = [];
	tableDataInEditing: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

	addItem(): void {
		this.tableData.push(this.tableDataConstructionFunction());
		this.toggleEditMode(this.tableData.length - 1);
		this.refreshTable();
	}

	saveItem(index: number):void {
		this.tableData.splice(index, 1, this.tableDataInEditing[index]);
		this.toggleEditMode(index);
		this.dataModified.next(this.tableData);
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
		this.dataModified.next(this.tableData);
	}
	
	refreshTable(): void {
		this.datasource.data = this.tableData;
	}

	getDisplayValue(value: any, displayProcessor: Function|undefined) : string {
		if(displayProcessor) {
			return displayProcessor(value);
		}
		return value;
	}

	openDatePicker(dp: any) {
    dp.open();
  }

  closeDatePicker(eventData: any, dp:any, tableObject: any, proprtyName: string) {
    tableObject[proprtyName]=eventData;
		dp.close();    
  }

}

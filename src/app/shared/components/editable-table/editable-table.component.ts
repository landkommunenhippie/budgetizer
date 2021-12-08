import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { EditableTableDescrption } from '../../models/editable-table-description.model';
import { MatTableDataSource } from '@angular/material/table';
import { MutableState } from 'src/app/core/state/mutable-state.model';

@Component({
  selector: 'app-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.scss'],
})
export class EditableTableComponent implements OnInit {

	@Input('table-data') set tableData(incomingtableData: any[]) {
		this._tableData = [...incomingtableData];
		this.refreshTable();
	}
	@Input('table-descriptions')
	tableDescriptions: EditableTableDescrption[] = [];
	@Input('table-data-construction-function')
	tableDataConstructionFunction: Function = () => null;
	
	@Output('data-modified')
	dataModified = new EventEmitter<any[]>();
	
	get tableData():any[] { return this._tableData; }
	private _tableData:any[]|MutableState<any>[] = [];
	datasource: MatTableDataSource<any> = new MatTableDataSource(this.tableData);
	displayedColumns = () => this.tableDescriptions.map(descr => descr.valuePropertyName).concat('actions'); 
	hasEditableItems = () => this.tableDescriptions.findIndex(descr => descr.editable) >= 0;
	
	isEditMode: boolean[] = [];
	tableDataInEditing: any[] = [];
	
	constructor() {
	}

  ngOnInit(): void {

	}

	addItem(): void {
		this.tableData.push(this.tableDataConstructionFunction());
		this.toggleEditMode(this.tableData.length - 1);
		this.refreshTable();
	}

	saveItem(index: number, $event: any):void {
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
			this.tableDataInEditing[rowIndex] = this._tableData[rowIndex].clone();
		} else {
			this.tableDataInEditing.splice(rowIndex, 1);
		}
		
	}

	delete(index: number): void {
		this.tableData.splice(index, 1);
		this.dataModified.next([...this.tableData]);
	}
	
	refreshTable(): void {
		this.datasource.data = this.tableData;
	}

	getDisplayValue(rowData: any, propertyName: string, displayProcessor: Function|undefined, dataSource: Function|undefined) : string {
		if (dataSource) {
			return dataSource(rowData);
		}
		if(displayProcessor) {
			return displayProcessor(rowData[propertyName]);
		}
		return rowData[propertyName];
	}

	openDatePicker(dp: any) {
    dp.open();
  }

  closeDatePicker(eventData: any, dp:any, tableObject: any, proprtyName: string) {
    tableObject[proprtyName]=eventData;
		dp.close();    
  }

}

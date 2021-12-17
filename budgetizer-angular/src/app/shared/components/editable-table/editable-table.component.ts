import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { EditableTableDescrption } from '../../models/editable-table-description.model';
import { MatTableDataSource } from '@angular/material/table';
import { formatNumber } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { EditableView } from '../../models/editable-view.model';

@Component({
  selector: 'app-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.scss'],
})
export class EditableTableComponent implements OnInit, AfterViewInit {

	@Input('table-data')
	set tableData(incomingtableData: EditableView<any,any>[]) {
		this._tableData = [...incomingtableData];
		this.refreshTable();
	}
	@Input('table-descriptions')
	tableDescriptions: EditableTableDescrption[] = [];
	@Input('table-data-construction-function')
	tableDataConstructionFunction: Function = () => null;
	@Input('default-sort')
	defaultSort!: string;
	
	@Output('data-modified')
	dataModified = new EventEmitter<any[]>();
	
	@ViewChild(MatSort)
	sort!: MatSort;
	getInitialSort = () => {
		let initialSort = this.tableDescriptions.find(descr => descr.initialSort); 
		if (initialSort) {
			return initialSort.valuePropertyName;
		}
		return null;
	};

	get tableData():any[] { return this._tableData; }
	private _tableData:any[] = [];
	datasource: MatTableDataSource<any> = new MatTableDataSource(this.tableData);
	displayedColumns = () => this.tableDescriptions.map(descr => descr.valuePropertyName).concat('actions'); 
	hasEditableItems = () => this.tableDescriptions.findIndex(descr => descr.editable) >= 0;
	
	isEditMode: boolean[] = [];
	tableDataInEditing: any[] = [];
	
	constructor() {
	}

  ngOnInit(): void { }

	ngAfterViewInit() {
		this.datasource.sort = this.sort;
	}

	addItem(): void {
		this.tableData.push(this.tableDataConstructionFunction());
		this.refreshTable();
		this.toggleEditMode(this.tableData.length - 1);
	}

	saveItem(index: number, $event: any):void {
		this.tableData.splice(index, 1, this.tableDataInEditing[index]);
		this.refreshTable();
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
		this.refreshTable();
		this.dataModified.next(this.tableData);
	}
	
	refreshTable(): void {
		this.datasource.data = this.tableData;
	}

	getDisplayValue(rowData: any, propertyName: string, displayProcessor: Function|undefined, dataSource: Function|undefined, shallFormatNumber: boolean) : string {
		let displayValue: any = undefined;
		if (dataSource) {
			displayValue = dataSource(rowData);
		} else if(displayProcessor) {
			displayValue = displayProcessor(rowData[propertyName]);
		} else {
			displayValue = rowData[propertyName];
		}
		if (shallFormatNumber) {
			displayValue = formatNumber(displayValue, 'de-DE', '1.0-2')
		}
		return displayValue;
	}

	openDatePicker(dp: any) {
    dp.open();
  }

  closeDatePicker(eventData: any, dp:any, tableObject: any, proprtyName: string) {
    tableObject[proprtyName]=eventData;
		dp.close();    
  }
}

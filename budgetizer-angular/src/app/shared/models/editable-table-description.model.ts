export interface EditableTableDescrption {
	
	label: string,
	valuePropertyName: string,
	valueInputType:string,
	editable: boolean,
	dataSource?: Function
	displayProcessor?: Function
}
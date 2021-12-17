export interface EditableTableDescrption {
	
	/**
	 * The column name label
	 */
	label: string,
	/**
	 * The property of the provided data for each row. The valuePropertyName is also used to identify columns. No duplicates allowed.
	 * If datasource is set use a dummy-name here. Convention is to start prefix the column-name with 'calc_' 
	*/
	valuePropertyName: string,
	/**
	 * specification of the type of the input in editing mode. Can be one of text, number, date
	*/
	valueInputType:string,
	/**
	 * specification if a column shall be editable. Will be assumed false if datasource is set
	*/
	editable?: boolean,
	/**
	 * specification of the source of a value that shall be displayed. Value cannot be modified since it cannot be bound.
	 * For informative calculations only. The function is passed a rowDataObject
	*/
	dataSource?: Function,
	/**
	 * Specification of the way a value shall be displayed when not in editing mode
	*/
	displayProcessor?: Function,
	/**
	 * Specification whether if valueInputType is set to date only months shall be choosable
	*/
	dateMonthOnly?: boolean,
	/**
	 * Specification if this coloumn is used for sorting
	*/
	sortable?: boolean,
	/**
	 * Specification of the initial sort property
	 * If multiple descriptions are set to true, the first one found will be used
	 */
	initialSort?: boolean,
	/**
	 * Specification of tooltip-text
	 */
	tooltipText?: string
}
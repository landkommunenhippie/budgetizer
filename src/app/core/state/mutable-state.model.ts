/**
 * 
 * Interface defining methods to make stored data mutbable by cloneing them
*/
export interface MutableState<T> {

	clone(): T;

}
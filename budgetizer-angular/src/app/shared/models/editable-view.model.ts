export  abstract class EditableView<INTERFACE_TYPE, CONCRETE_TYPE> {
	
	protected abstract byInterface(dataOnly: INTERFACE_TYPE): CONCRETE_TYPE;
	public abstract toInterface(): INTERFACE_TYPE;

	public clone(): CONCRETE_TYPE {
		return this.byInterface(this.toInterface());
	}
}
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item-adder',
  templateUrl: './item-adder.component.html',
  styleUrls: ['./item-adder.component.scss']
})
export class ItemAdderComponent implements OnInit {

	@Input('add-item-function')
	public addItemFunction: Function = (): any => null ;

	@Output()
	addItemEvent: EventEmitter<any> =  new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
	
}

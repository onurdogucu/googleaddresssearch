import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-selected-address',
  templateUrl: './selected-address.component.html',
  styleUrls: ['./selected-address.component.scss']
})
export class SelectedAddressComponent implements OnInit {

  @Input() selectedAddress: any;
  @Output() goBackEmitter = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit() {
  }

  goBack() {
    this.goBackEmitter.emit();
  }
}

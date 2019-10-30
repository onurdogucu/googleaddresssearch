import { Component, ViewChild, EventEmitter, Output, OnInit, AfterViewInit, Input } from '@angular/core';
import { } from 'googlemaps';
declare var google: any;

@Component({
  selector: 'app-google-places',
  templateUrl: './google-places.component.html',
  styleUrls: ['./google-places.component.scss']
})
export class GooglePlacesComponent implements OnInit, AfterViewInit {
  @Input() adressType: string;
  @Input() validState: boolean;
  @Input() buttonClass: any;
  @Input() errorMessage: string;

  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @Output() okClickEmitter = new EventEmitter<number>();

  @ViewChild('addressText', { static: false }) addressText: any;

  autocompleteInput: string;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.addressText.nativeElement,
      {
        componentRestrictions: { country: 'US' },
        types: [this.adressType]  // 'establishment' / 'address' / 'geocode'
      });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.invokeEvent(place);
    });
  }

  invokeEvent(place: any) {
    this.setAddress.emit(place);
  }

  selectAddress($event) {
    this.okClickEmitter.emit();
  }

}

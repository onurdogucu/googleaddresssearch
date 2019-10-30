import {Component, EventEmitter, NgZone, OnInit, Output} from '@angular/core';
import { Title } from '@angular/platform-browser';
import {} from 'googlemaps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  successButtonClassList = ['btn', 'btn-success'];
  disabledButtonClassList = ['btn', 'btn-secondary'];
  offeredState: any = ['Illinois', 'Georgia', 'Wisconsin', 'IL', 'GA', 'WI'];
  buttonClass = this.disabledButtonClassList;
  clicked = false;
  validState = false;
  address: any;
  country: string;
  state: string;
  streetNumber: string;
  route: string;
  locality: string;
  postCode: string;
  selectedAddressProps: any;

  errorMessage = '';

  constructor(private titleService: Title,
              public zone: NgZone) {
  }

  ngOnInit() {
    this.titleService.setTitle('Google Address Search');
  }

  getAddress(place: any) {
    this.country = this.getCountry(place);
    this.state = this.getState(place);
    this.streetNumber = this.getStreetNumber(place);
    this.route = this.getRoute(place);
    this.locality = this.getLocality(place);
    this.postCode = this.getPostCode(place);
    this.validState = true;
    this.address = `${this.streetNumber} ${this.route}, ${this.locality}, ${this.country}`;
    this.checkIfAddressValid();

    this.zone.run(() => this.address);
  }

  getAddrComponent(place, componentTemplate) {
    let result;

    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0];
      if (componentTemplate[addressType]) {
        result = place.address_components[i][componentTemplate[addressType]];
        return result;
      }
    }
    return;
  }

  getStreetNumber(place) {
    const COMPONENT_TEMPLATE = { street_number: 'short_name' };
    const  streetNumber = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return streetNumber;
  }

  getRoute(place) {
    const COMPONENT_TEMPLATE = { route: 'long_name' };
    const  streetNumber = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return streetNumber;
  }

  getLocality(place) {
    const COMPONENT_TEMPLATE = { locality: 'short_name' };
    const  streetNumber = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return streetNumber;
  }

  getState(place) {
    const COMPONENT_TEMPLATE = { administrative_area_level_1: 'long_name' };
    const  state = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return state;
  }

  getCountry(place) {
    const COMPONENT_TEMPLATE = { country: 'short_name' };
    const  state = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return state;
  }

  getPostCode(place) {
    const COMPONENT_TEMPLATE = { postal_code: 'long_name' };
    const  postCode = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return postCode;
  }

  selectAddress($event) {
    this.clicked = true;
  }

  checkIfAddressValid() {
    const offeredStateValidation = this.checkOfferedStates(this.state);
    if (offeredStateValidation < 0) {
      this.errorMessage = 'Sorry, we are currently only lending in IL, GA, and WI';
      this.validState = false;
      this.buttonClass = this.disabledButtonClassList;
    } else if (!this.postCode) {
      this.errorMessage = 'Sorry, you must select an address with a zip code';
      this.validState = false;
      this.buttonClass = this.disabledButtonClassList;
    } else if (this.postCode.length !== 5) {
      this.errorMessage = 'Sorry, zip code must be 5 digits length';
      this.validState = false;
      this.buttonClass = this.disabledButtonClassList;
    } else {
      this.validState = true;
      this.errorMessage = '';
      this.buttonClass = this.successButtonClassList;
      this.setAddressProps();
    }
  }

  setAddressProps() {
    this.selectedAddressProps = {
      address: this.address,
      zipCode: this.postCode,
      state: this.state
    };
  }

  checkOfferedStates(state) {
    return this.offeredState.indexOf(state);
  }

  goBackInit() {
    this.clicked = false;
    this.validState = false;
    this.buttonClass = this.disabledButtonClassList;
  }
}

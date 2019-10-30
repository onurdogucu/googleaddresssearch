import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GooglePlacesComponent } from './google-places/google-places.component';
import { FormsModule } from '@angular/forms';
import { SelectedAddressComponent } from './selected-address/selected-address.component';

@NgModule({
  declarations: [
    AppComponent,
    GooglePlacesComponent,
    SelectedAddressComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

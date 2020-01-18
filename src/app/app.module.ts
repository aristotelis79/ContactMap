import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CardsComponent } from './cards/cards.component';
import { CardComponent } from './cards/card/card.component';
import { AddContactComponent } from './cards/contact/add-contact.component';
import { AddAddressComponent } from './cards/address/add-address.component';
import { MapComponent } from './map/map.component'

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    CardComponent,
    AddContactComponent,
    AddAddressComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

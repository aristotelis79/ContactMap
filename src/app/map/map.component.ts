import { Component, OnInit, NgZone, Inject } from '@angular/core';
import { MessageService } from '../services/message.service';
import { Subscription } from 'rxjs';
import { IAddress } from '../models/address.model';
import { MapsAPILoader } from '@agm/core';
import { JQ_TOKEN } from '../common/jquery.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  latitude = 37.9756723;
  longitude = 23.7348229;
  mapType = 'roadmap';
  subscription: Subscription;
  private geoCoder;
  markers = [];

  constructor(private messageService: MessageService,
    private mapsAPILoader: MapsAPILoader,
    @Inject(JQ_TOKEN) private $: any) { }

  ngOnInit(): void {

    this.mapsAPILoader.load().then(() => {
      //let g = window['google'];
      this.geoCoder = new google.maps.Geocoder;
    });

    this.subscription = this.messageService.getAddMessage().subscribe(address => {
      debugger;

      if (address) {
        if (address.contactId % 2 == 0)
          var results = JSON.parse('[{"address_components":[{"long_name":"47","short_name":"47","types":["street_number"]},{"long_name":"Chiou","short_name":"Chiou","types":["route"]},{"long_name":"Peristeri","short_name":"Peristeri","types":["locality","political"]},{"long_name":"Ditikos Tomeas Athinon","short_name":"Ditikos Tomeas Athinon","types":["administrative_area_level_3","political"]},{"long_name":"Greece","short_name":"GR","types":["country","political"]},{"long_name":"121 33","short_name":"121 33","types":["postal_code"]}],"formatted_address":"Chiou 47, Peristeri 121 33, Greece","geometry":{"location":{"lat":38.02174180000001,"lng":23.697979300000043},"location_type":"ROOFTOP","viewport":{"south":38.02039281970851,"west":23.696630319708447,"north":38.02309078029151,"east":23.699328280291525}},"place_id":"ChIJK3lddhajoRQRLgMKMj9WcqY","plus_code":{"compound_code":"2MCX+M5 Peristeri, Greece","global_code":"8GC52MCX+M5"},"types":["street_address"]}]');
        else
          var results = JSON.parse('[{"address_components":[{"long_name":"47","short_name":"47","types":["street_number"]},{"long_name":"Chiou","short_name":"Chiou","types":["route"]},{"long_name":"Peristeri","short_name":"Peristeri","types":["locality","political"]},{"long_name":"Ditikos Tomeas Athinon","short_name":"Ditikos Tomeas Athinon","types":["administrative_area_level_3","political"]},{"long_name":"Greece","short_name":"GR","types":["country","political"]},{"long_name":"121 33","short_name":"121 33","types":["postal_code"]}],"formatted_address":"Xania 100, Peristeri 121 33, Greece","geometry":{"location":{"lat":38.03174180000001,"lng":23.677979300000043},"location_type":"ROOFTOP","viewport":{"south":38.02039281970851,"west":23.696630319708447,"north":38.02309078029151,"east":23.699328280291525}},"place_id":"ChIJK3lddhajoRQRLgMKMj9WcqY","plus_code":{"compound_code":"2MCX+M5 Peristeri, Greece","global_code":"8GC52MCX+M5"},"types":["street_address"]}]');
        var loc = results[0].geometry.location;

        //this.codeAddress(address).then((loc) => {
        this.addMarker(parseFloat(loc.lat), parseFloat(loc.lng), { fontWeight: 'bold', text: address.roadName }, address.roadName);
        //})
      }
    });

    this.subscription = this.messageService.getDeleteMessage().subscribe(address => {
      debugger;
      if (address.contactId % 2 == 0)
        var results = JSON.parse('[{"address_components":[{"long_name":"47","short_name":"47","types":["street_number"]},{"long_name":"Chiou","short_name":"Chiou","types":["route"]},{"long_name":"Peristeri","short_name":"Peristeri","types":["locality","political"]},{"long_name":"Ditikos Tomeas Athinon","short_name":"Ditikos Tomeas Athinon","types":["administrative_area_level_3","political"]},{"long_name":"Greece","short_name":"GR","types":["country","political"]},{"long_name":"121 33","short_name":"121 33","types":["postal_code"]}],"formatted_address":"Chiou 47, Peristeri 121 33, Greece","geometry":{"location":{"lat":38.02174180000001,"lng":23.697979300000043},"location_type":"ROOFTOP","viewport":{"south":38.02039281970851,"west":23.696630319708447,"north":38.02309078029151,"east":23.699328280291525}},"place_id":"ChIJK3lddhajoRQRLgMKMj9WcqY","plus_code":{"compound_code":"2MCX+M5 Peristeri, Greece","global_code":"8GC52MCX+M5"},"types":["street_address"]}]');
      else
        var results = JSON.parse('[{"address_components":[{"long_name":"47","short_name":"47","types":["street_number"]},{"long_name":"Chiou","short_name":"Chiou","types":["route"]},{"long_name":"Peristeri","short_name":"Peristeri","types":["locality","political"]},{"long_name":"Ditikos Tomeas Athinon","short_name":"Ditikos Tomeas Athinon","types":["administrative_area_level_3","political"]},{"long_name":"Greece","short_name":"GR","types":["country","political"]},{"long_name":"121 33","short_name":"121 33","types":["postal_code"]}],"formatted_address":"Xania 100, Peristeri 121 33, Greece","geometry":{"location":{"lat":38.03174180000001,"lng":23.677979300000043},"location_type":"ROOFTOP","viewport":{"south":38.02039281970851,"west":23.696630319708447,"north":38.02309078029151,"east":23.699328280291525}},"place_id":"ChIJK3lddhajoRQRLgMKMj9WcqY","plus_code":{"compound_code":"2MCX+M5 Peristeri, Greece","global_code":"8GC52MCX+M5"},"types":["street_address"]}]');
      var loc = results[0].geometry.location;
      this.removeMarker(parseFloat(loc.lat), parseFloat(loc.lng), { fontWeight: 'bold', text: address.roadName }, address.roadName);
    });
  }

  addMarker(lat: number, lng: number, label: any, title: string) {
    this.markers.push({ lat, lng, label: label, title });
  }

  removeMarker(lat: number, lng: number, label: any, title: string) {
    this.markers = this.markers.filter(function (m) {
      return m.title !== title;
    })
  }

  max(coordType: 'lat' | 'lng'): number {
    return Math.max(...this.markers.map(marker => marker[coordType]));
  }

  min(coordType: 'lat' | 'lng'): number {
    return Math.min(...this.markers.map(marker => marker[coordType]));
  }

  codeAddress(address: IAddress): any {
    var formatAddress = `${address.roadName} ${address.roadNumber}, ${address.area},
     ${address.city}, ${address.zipCode}, ${address.country}`;

    return new Promise((rs, rj) => {
      this.geoCoder.geocode({ 'address': formatAddress }, function (results, status) {
        if (status == 'OK') {
          rs(results[0].geometry.location);
        } else {
          rj(alert('Geocode was not successful for the following reason: ' + status));
        }
      });
    });
  }
}

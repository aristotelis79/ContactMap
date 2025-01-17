import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { MapsAPILoader } from '@agm/core';
import { MapService } from '../services/map.service';
import { IMarker } from '../models/marker.model';
import { IToastr, TOASTR_TOKEN } from '../common/toastr.service';

declare let google;

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

  constructor(private mapService: MapService,
    private mapsAPILoader: MapsAPILoader,
    @Inject(TOASTR_TOKEN) private toastr: IToastr) { }

  ngOnInit(): void {

    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
    });
    this.subscription = this.mapService.getAddMessage().subscribe(marker => {
      if (marker) {
        this.geocodeAddress(marker).then((loc) => {
          this.addMarker(parseFloat(loc.lat), parseFloat(loc.lng), { fontWeight: 'bold', text: marker.fullName }, `${marker.fullName}-${marker.addressIndex}`);
        })
      }
    });

    this.subscription = this.mapService.getDeleteMessage().subscribe(marker => {
      this.removeMarker(`${marker.fullName}-${marker.addressIndex}`);
    });
  }

  addMarker(lat: number, lng: number, label: any, title: string) {
    this.markers.push({ lat, lng, label: label, title });
    this.updateCenter();

  }

  removeMarker(title: string) {
    this.markers = this.markers.filter((m) => m.title !== title);
    this.updateCenter();

  }

  geocodeAddress(marker: IMarker): any {
    var formatAddress = `${marker.address.roadName} ${marker.address.roadNumber}, ${marker.address.area},
     ${marker.address.city}, ${marker.address.zipCode}, ${marker.address.country}`;

    return new Promise((rs, rj) => {
      this.geoCoder.geocode({ 'address': formatAddress }, function (results, status) {
        if (status == 'OK') {
          rs(results[0].geometry.location);
        } else {
          var errorMsg = 'Geocode was not successful for the following reason: ' + status;
          this.toastr.warning(errorMsg, 'Geocode Error');
          rj(errorMsg);
        }
      });
    });
  }

  updateCenter() {
    if (this.markers.length <= 0) return;

    var m = this.markers[this.markers.length - 1];
    this.latitude = m.lat;
    this.longitude = m.lng;
  }
}

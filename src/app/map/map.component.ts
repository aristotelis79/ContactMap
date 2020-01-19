import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  latitude = -28.68352;
  longitude = -147.20785;
  mapType = 'satellite';
}

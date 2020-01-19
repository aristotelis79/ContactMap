import { Component, OnInit, Input, Inject } from '@angular/core';
import { IContact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { JQ_TOKEN } from 'src/app/common/jquery.service';
import { MapService } from 'src/app/services/map.service';
import { IMarker } from 'src/app/models/marker.model';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() contact: IContact;
  @Input() elementId: string;
  marked = {};

  constructor(private contactService: ContactService,
    @Inject(JQ_TOKEN) private $: any,
    private mapService: MapService) { }

  ngOnInit() {
  }

  deleteContact(id) {
    this.contactService.deleteContact(id).subscribe(s => {
      this.$(`#card-contact-${id}`).remove()
    });
  }

  toggleAddress(i: number) {

    this.marked[i] = !this.marked[i];

    var marker: IMarker = {
      addressIndex: i,
      fullName: this.contact.fullName,
      address: this.contact.addresses[i]
    }

    if (this.marked[i])
      this.mapService.sendAddMessage(marker);
    else
      this.mapService.sendDeleteMessage(marker);
  }
}

import { Component, OnInit, Input, Inject } from '@angular/core';
import { IContact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { JQ_TOKEN } from 'src/app/common/jquery.service';
import { MessageService } from 'src/app/services/message.service';
import { IAddress } from 'src/app/models/address.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() contact: IContact;
  @Input() elementId: string;
  marked = false;
  theCheckbox = false;

  constructor(private contactService: ContactService,
    @Inject(JQ_TOKEN) private $: any,
    private map: MessageService) { }

  ngOnInit() {
  }

  deleteContact(id) {
    this.contactService.deleteContact(id).subscribe(s => {
      debugger;
      this.$(`#card-contact-${id}`).remove()
    });
  }

  toggleAddress(e) {
    this.marked = e.target.checked;
    this.map.sendMessage(this.contact.addresses[0]);
  }
}

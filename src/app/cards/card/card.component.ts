import { Component, OnInit, Input, Inject } from '@angular/core';
import { IContact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { JQ_TOKEN } from 'src/app/common/jquery.service';
import { MessageService } from 'src/app/services/message.service';

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
    private messageService: MessageService) { }

  ngOnInit() {
  }

  deleteContact(id) {
    this.contactService.deleteContact(id).subscribe(s => {
      debugger;
      this.$(`#card-contact-${id}`).remove()
    });
  }

  toggleAddress(i: number) {
    this.marked[i] = !this.marked[i];
    if (this.marked[i])
      this.messageService.sendAddMessage(this.contact.addresses[i]);
    else
      this.messageService.sendDeleteMessage(this.contact.addresses[i]);
  }
}

import { Component, OnInit } from '@angular/core';
import { IContact } from '../models/contact.model';
import { ContactService } from '../services/contact.service';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  contacts: IContact[];
  isSaved: boolean = false;
  constructor(
    private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.getContacts().subscribe(s => {
      this.contacts = s;
    });
  }
}

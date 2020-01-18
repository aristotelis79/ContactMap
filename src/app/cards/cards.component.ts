import { Component, OnInit } from '@angular/core';
import { IContact } from '../models/contact.model';
import { ActivatedRoute } from "@angular/router";
import { ContactService } from '../services/contact.service';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  contacts: IContact[];
  constructor(private route: ActivatedRoute, private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.getContacts().subscribe(s => {
      this.contacts = s;
    });
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { IContact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() contact: IContact;

  constructor() { }

  ngOnInit() {
  }

}

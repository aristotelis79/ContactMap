import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IContact } from '../models/contact.model';
import { ContactService } from '../services/contact.service';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  contacts: IContact[];
  showModal: boolean;
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private contactService: ContactService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.contactService.getContacts().subscribe(s => {
      this.contacts = s;
    });

    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.min(7), Validators.maxLength(14)]],
      title: '',
      company: '',
      address: this.formBuilder.group({
        roadName: ['', [Validators.required]],
        roadNumber: ['', [Validators.required]],
        zipCode: ['', [Validators.required]],
        city: ['', [Validators.required]],
        country: ['', [Validators.required]],
        area: ''
      }),
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(formValues) {
    debugger;

    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.contactService.createContact(formValues)
    if (this.submitted) {
      this.showModal = false;
    }
  }

  show() {
    this.showModal = true; // Show-Hide Modal Check

  }
  //Bootstrap Modal Close event
  hide() {
    this.showModal = false;

  }
}
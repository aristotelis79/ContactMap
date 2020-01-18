import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IContact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  contacts: IContact[];
  showModal: boolean;
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private contactService: ContactService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.min(7), Validators.maxLength(14)]],
      title: '',
      company: '',
      addresses: this.formBuilder.array([
        this.formBuilder.group({
          roadName: ['', [Validators.required]],
          roadNumber: ['', [Validators.required]],
          zipCode: ['', [Validators.required]],
          city: ['', [Validators.required]],
          country: ['', [Validators.required]],
          area: ''
        })
      ]),
    });
  };

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(contact) {
    debugger;
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    if (this.submitted) {
      this.contactService.createContact(contact).subscribe(s => {
        debugger;
        this.showModal = false;
      });
    }
  }

  show() { this.showModal = true; }
  hide() { this.showModal = false; }
}

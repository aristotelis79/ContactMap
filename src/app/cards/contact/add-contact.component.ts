import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IContact } from 'src/app/models/contact.model';

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
    private formBuilder: FormBuilder) { }

  ngOnInit() {
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
  };



  get f() {
    return this.registerForm.controls;
  }

  onSubmit(formValues) {
    debugger;

    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
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

import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IContact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { TOASTR_TOKEN, IToastr } from 'src/app/common/toastr.service';

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
    private formBuilder: FormBuilder,
    @Inject(TOASTR_TOKEN) private toastr: IToastr) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(14)]],
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

  onSubmit(contact) {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    if (this.submitted) {
      this.contactService.createContact(contact).subscribe(s => {
        this.showModal = false;
        this.toastr.success('Contact created');
      });
    }
  }

  get f() { return this.registerForm.controls; }
  get fa() { return this.registerForm.controls.addresses; }
  show() { this.showModal = true; }
  hide() { this.showModal = false; }
}

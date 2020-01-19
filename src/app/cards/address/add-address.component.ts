import { Component, OnInit, Input, Inject } from '@angular/core';
import { IAddress } from 'src/app/models/address.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddreessService } from 'src/app/services/addreess.service';
import { IToastr, TOASTR_TOKEN } from 'src/app/common/toastr.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {
  address: IAddress[];
  showModal: boolean;
  registerForm: FormGroup;
  submitted = false;
  @Input() contactId: number;

  constructor(
    private addressService: AddreessService,
    private formBuilder: FormBuilder,
    @Inject(TOASTR_TOKEN) private toastr: IToastr) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      roadName: ['', [Validators.required]],
      roadNumber: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      area: ''
    });
  };

  onSubmit(addreess: IAddress) {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    if (this.submitted) {
      addreess.contactId = this.contactId;
      this.addressService.createAddress(addreess).subscribe(s => {
        this.showModal = false;
        this.toastr.success('Addrees created');
      });
    }
  }

  get fa() { return this.registerForm.controls; }
  show() { this.showModal = true; }
  hide() { this.showModal = false; }
}

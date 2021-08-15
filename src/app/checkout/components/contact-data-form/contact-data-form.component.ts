import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-data-form',
  templateUrl: './contact-data-form.component.html',
  styleUrls: ['./contact-data-form.component.scss']
})
export class ContactDataFormComponent implements OnInit, OnDestroy {
  @Input() parentForm!: FormGroup;
  @Input() formName!: string;
  @Input() set receiver(receiver: string) {
    if (receiver === 'Me') {
      this.contactForm.get('surname')?.setValue(this.parentForm.get('customer-contact-data')?.get('surname')?.value);
      this.contactForm.get('name')?.setValue(this.parentForm.get('customer-contact-data')?.get('name')?.value);
      this.contactForm.get('phone')?.setValue(this.parentForm.get('customer-contact-data')?.get('phone')?.value);
      this.contactForm.get('adress')?.setValue(this.parentForm.get('customer-contact-data')?.get('adress')?.value);
    }

    if (receiver === 'Another person') {
      this.contactForm.reset();
    }
  }

  contactForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      surname: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      adress: new FormControl(null, Validators.required)
    });

    this.parentForm.addControl(this.formName, this.contactForm);
  }

  ngOnDestroy(): void {
    this.parentForm.removeControl('formName');
  }
}

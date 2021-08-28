import { CheckoutService } from './../../../shared/services/checkout.service';
import { UserData } from './../../../shared/interfaces/user-data.interface';
import { Subscription } from 'rxjs';
import { UserDataService } from './../../../shared/services/user-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contact-data-form',
  templateUrl: './contact-data-form.component.html',
  styleUrls: ['./contact-data-form.component.scss']
})
export class ContactDataFormComponent implements OnInit, OnDestroy {
  @Input() parentForm!: FormGroup;
  @Input() formName!: string;
  @Input() set receiver(receiver: string) {
    this._receiver = receiver;

    if (receiver === 'Me') {
      this.setCustomerData();

      this.resetForm = true;
    }

    if (receiver === 'Another person' && this.resetForm) {
      this.contactForm.reset();
    }
  }

  get receiver(): string {
    return this._receiver;
  }

  @Output() receiverChange = new EventEmitter<string>();

  // tslint:disable-next-line:variable-name
  _receiver = '';
  resetForm = true;
  contactForm!: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(
    private userDataServ: UserDataService,
    private checkoutServ: CheckoutService
  ) { }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      surname: new FormControl(null, [
        Validators.required,
        Validators.minLength(2)
      ]),
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2)
      ]),
      number: new FormControl(null, [
        Validators.required,
        Validators.pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)
      ]),
      city: new FormControl(null, [
        Validators.required,
        Validators.minLength(2)
      ])
    });

    this.parentForm.addControl(this.formName, this.contactForm);

    if (!this.receiver) {
      this.subscriptions.push(
        this.userDataServ.getUserData()
          .subscribe((userData: UserData) => {
            this.contactForm?.get('surname')?.setValue(userData.surname);
            this.contactForm?.get('name')?.setValue(userData.name);
            this.contactForm?.get('number')?.setValue(userData.number);
            this.contactForm?.get('city')?.setValue(userData.city);

            this.checkoutServ.contactFormDataChanged();
          })
      );
    }

    this.subscriptions.push(
      this.checkoutServ.contactForm$
        .subscribe((message: string) => {
          if (message === 'changed') {
            if (this.receiver === 'Me') {
              this.setCustomerData();
            }
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.parentForm.removeControl('formName');

    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  private setCustomerData(): void {
    this.contactForm?.get('surname')?.setValue(this.parentForm.get('customer-contact-data')?.get('surname')?.value);
    this.contactForm?.get('name')?.setValue(this.parentForm.get('customer-contact-data')?.get('name')?.value);
    this.contactForm?.get('number')?.setValue(this.parentForm.get('customer-contact-data')?.get('number')?.value);
    this.contactForm?.get('city')?.setValue(this.parentForm.get('customer-contact-data')?.get('city')?.value);
  }

  contactFormInput(): void {
    this.resetForm = false;

    this.receiverChange.emit('Another person');
  }

  patchContactInfo(): void {
    if (this.receiver) {
      return;
    }

    this.subscriptions.push(
      this.userDataServ.getUserData()
        .subscribe((userData: UserData) => {
          userData.surname = this.contactForm.get('surname')?.value;
          userData.name = this.contactForm.get('name')?.value;
          userData.number = this.contactForm.get('number')?.value;
          userData.city = this.contactForm.get('city')?.value;

          this.subscriptions.push(
            this.userDataServ.patchUserData(userData)
              .subscribe((patchedData) => {
                this.checkoutServ.contactFormDataChanged();
                console.log(patchedData);
              })
          );
        })
    );
  }
}

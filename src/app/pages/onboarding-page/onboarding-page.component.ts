import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormArray,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { PersonalInformation } from './onboarding-models';

@Component({
  selector: 'app-onboarding-page',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
  imports: [
    CommonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatSlideToggleModule,
  ],
  templateUrl: './onboarding-page.component.html',
  styleUrl: './onboarding-page.component.css',
})
export class OnboardingPageComponent {
  contactInformationStatus: boolean = false;

  // TODO: add detailed validation
  personalInformation: FormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    middleName: ['', Validators.required],
    lastName: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    gender: ['', Validators.required],
    nationality: ['', Validators.required],
    maritalStatus: ['', Validators.required],
    residentialAddress: [''],
    mailingAddress: [''],
    phoneNumber: [''],
    emailAddress: [''],
  });

  // TODO: add sourceOfIncome, can be multiple
  // each source has type(salary, freelance), source(investment), amount
  employmentAndIncome: FormGroup = this._formBuilder.group({
    occupation: ['', Validators.required],
    employerName: ['', Validators.required],
    employerAddress: ['', Validators.required],
    employmentStatus: ['', Validators.required],
    jobTitle: ['', Validators.required],
    yearOfCurrentEmployer: ['', Validators.required],
    annualIncome: ['', Validators.required],
    sourcesOfIncome: this._formBuilder.array([]),
  });

  constructor(private _formBuilder: FormBuilder) {}

  get sourcesOfIncome(): FormArray {
    return this.employmentAndIncome.get('sourcesOfIncome') as FormArray;
  }

  onContactInformationStatusChange() {
    this.contactInformationStatus = !this.contactInformationStatus;

    if (!this.contactInformationStatus) {
      this.personalInformation.patchValue({
        residentialAddress: '',
        mailingAddress: '',
        phoneNumber: '',
        emailAddress: '',
      });
    }
  }

  onSubmit() {
    if (this.personalInformation.valid) {
      const personalInformation: PersonalInformation =
        this.personalInformation.value;
      console.log(personalInformation);
    } else {
      console.log('Data is not valid');
    }
  }
}

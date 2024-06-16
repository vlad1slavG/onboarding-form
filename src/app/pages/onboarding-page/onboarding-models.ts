export interface OnboardingModel {
  personalInformation: PersonalInformation;
}

export interface PersonalInformation {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  nationality: string;
  maritalStatus: string;
  residentialAddress?: string;
  mailingAddress?: string;
  phoneNumber?: string;
  emailAddress?: string;
}

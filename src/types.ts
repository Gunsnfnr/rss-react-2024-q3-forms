export interface User {
  name: string;
  age: number;
  email: string;
  password: string;
  country: string;
  gender: string;
}

export interface ValidateUser {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  genderMale: NonNullable<boolean | undefined>;
  genderFemale: NonNullable<boolean | undefined>;
  terms: true;
  // country: string;
  gender?: string;
}

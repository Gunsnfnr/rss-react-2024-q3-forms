import { object, string, number, boolean } from 'yup';
import * as yup from 'yup';
import { countries } from './data/countries';

export const userSchema = object({
  name: string()
    .required('Name is a required field. ')
    .matches(/^[A-Z]{1}[a-z]{1,}$/, ' Сapitalise the first letter, use English alphabet'),
  age: number().typeError('Age must be a number.').positive(' Age must be a positive number.').required(),
  email: string().required('Email is a required field. ').email('Email must be a valid email.'),
  password: string()
    .required('Password is a required field. ')
    .matches(/^[\S]{0,}[A-Z]{1}[\S]{0,}$/, ' Must include an uppercased letter.')
    .matches(/^[\S]{0,}[a-z]{1}[\S]{0,}$/, ' Must include a lowercased letter.')
    .matches(/^[\S]{0,}[\W]{1}[\S]{0,}$/, ' Must include a special character.')
    .matches(/^[\S]{0,}[0-9]{1}[\S]{0,}$/, ' Must include a number.'),
  confirmPassword: string()
    .required('Confirm password is a required field. ')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  genderMale: boolean(),
  genderFemale: boolean()
    // .required('This is a mandatory question.')
    .when('genderMale', {
      is: false,
      then: (userSchema) => userSchema.isTrue('This is a mandatory question.'),
    }),
  gender: string().required(),
  country: string().required('Country is a required field. ').oneOf(countries, 'Select country from the list.'),
  terms: boolean().required('This is a mandatory question.').isTrue('You must agree with the terms and conditions.'),
});

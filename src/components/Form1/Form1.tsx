import { Link } from 'react-router-dom';
import _ from './Form1.module.css';
import { FormEvent, useRef, useState } from 'react';
import { object, string, ValidationError, number } from 'yup';

const Form1 = () => {
  const [nameError, setNameError] = useState('');
  const [ageError, setAgeError] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent): Promise<void | null> => {
    e.preventDefault();
    if (!nameRef.current || !ageRef.current) return null;
    const userSchema = object({
      name: string()
        .required('Name is a required field. ')
        .matches(/^[A-Z]{1}[a-z]{1,}$/, ' Сapitalise first letter, use English alphabet'),
      age: number().typeError('Age must be a number.').positive(' Age must be a positive number.'),
    });
    try {
      const user = await userSchema.validate(
        { name: nameRef.current.value, age: ageRef.current.value },
        { abortEarly: false },
      );
      console.log('user: ', user);

      setNameError('');
      setAgeError('');
    } catch (err: unknown) {
      if (err instanceof ValidationError) {
        const errors: Record<string, string> = { name: '', age: '' };

        err.inner.forEach((unit) => {
          if (unit.path) errors[unit.path] += unit.errors[0];
        });
        setNameError(errors.name);
        setAgeError(errors.age);
      }
    }
  };

  return (
    <>
      <h2>Form #1 - uncontrolled components</h2>
      <div className={_.mb25}>
        Back to <Link to="/">the Main page</Link>
      </div>

      <form
        className={_.form1}
        onSubmit={(e: FormEvent) => {
          void handleSubmit(e);
        }}
      >
        <div className={_.formUnit}>
          <label htmlFor="name" className={_.name}>
            Name
            <input type="text" id="name" name="name" ref={nameRef} />
          </label>
          <span className={_.error}>{nameError}</span>
        </div>

        <div className={_.formUnit}>
          <label htmlFor="age" className={_.age}>
            Age
            <input type="number" id="age" name="age" ref={ageRef} />
          </label>
          <span className={_.error}>{ageError}</span>
        </div>

        <div className={_.formUnit}>
          <label htmlFor="email" className={_.email}>
            Email
            <input type="text" id="email" name="email" />
          </label>
          <span className={_.error}></span>
        </div>

        <div className={_.formUnit}>
          <label htmlFor="password" className={_.password}>
            Password
            <input type="password" id="password" name="password" />
          </label>
          <span className={_.error}></span>
        </div>

        <div className={_.formUnit}>
          <label htmlFor="confirm_password" className={_.confirm_password}>
            Confirm password
            <input type="text" id="confirm_password" name="confirm_password" />
          </label>
          <span className={_.error}></span>
        </div>

        <div className={_.formUnit}>
          <div className={_.gender}>
            <span>Gender</span>

            <div className={_.genders}>
              <label htmlFor="gender_m" className={_.pr20}>
                Male
                <input type="radio" id="gender_m" name="gender" value="male" />
              </label>
              <label htmlFor="gender_f">
                Female
                <input type="radio" id="gender_f" name="gender" value="female" />
              </label>
            </div>
          </div>
          <span className={_.error}></span>
        </div>

        <div className={_.formUnit}>
          <input className={_.uploadImage} type="file" name="image" id="image" accept="image/png, image/jpeg" />
          <span className={_.error}></span>
        </div>

        <div className={_.formUnit}>
          <label htmlFor="country" className={_.country}>
            Country
            <input type="text" id="country" name="country" />
          </label>
          <span className={_.error}></span>
        </div>

        <div className={_.formUnit}>
          <label htmlFor="terms" className={_.terms}>
            <input type="checkbox" id="terms" name="terms" className={_.mr10} />
            Terms and Conditions
          </label>
          <span className={_.error}></span>
        </div>

        <input type="submit" value="Submit" />
      </form>
    </>
  );
};
export default Form1;

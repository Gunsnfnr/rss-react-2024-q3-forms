import { Link } from 'react-router-dom';
import _ from './Form1.module.css';

const Form1 = () => {
  return (
    <>
      <h2>Form #1 - uncontrolled components</h2>
      <div className={_.mb25}>
        Back to <Link to="/">the Main page</Link>
      </div>

      <form className={_.form1}>
        <label htmlFor="name" className={_.name}>
          Name
          <input type="text" id="name" name="name" />
        </label>

        <label htmlFor="age" className={_.age}>
          Age
          <input type="number" id="age" name="age" min={0} />
        </label>

        <label htmlFor="email" className={_.email}>
          Email
          <input type="text" id="email" name="email" />
        </label>

        <label htmlFor="password" className={_.password}>
          Password
          <input type="text" id="password" name="password" />
        </label>

        <label htmlFor="confirm_password" className={_.confirm_password}>
          Confirm password
          <input type="text" id="confirm_password" name="confirm_password" />
        </label>

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

        <input className={_.uploadImage} type="file" name="image" id="image" accept="image/png, image/jpeg" />

        <label htmlFor="country" className={_.country}>
          Country
          <input type="text" id="country" name="country" />
        </label>

        <label htmlFor="terms" className={_.terms}>
          <input type="checkbox" id="terms" name="terms" className={_.mr10} />
          Terms and Conditions
        </label>

        <input type="submit" value="Submit" />
      </form>
    </>
  );
};
export default Form1;

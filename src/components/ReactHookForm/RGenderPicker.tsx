import { FieldError, UseFormRegister } from 'react-hook-form';
import { ValidateUser } from '../../types';
import _ from '../Components.module.css';
interface Props {
  register: UseFormRegister<ValidateUser>;
  error: FieldError | undefined;
}
const RGenderPicker = (props: Props) => {
  return (
    <div className={_.formUnit}>
      <div className={_.gender}>
        <span>Gender</span>

        <div className={_.genders}>
          <label htmlFor="gender_m" className={_.pr70}>
            Male
            <input type="radio" id="gender_m" value="male" {...props.register('gender')} checked={true} />
          </label>
          <label htmlFor="gender_f">
            Female
            <input type="radio" id="gender_f" value="female" {...props.register('gender')} />
          </label>
        </div>
      </div>
      <span className={_.error}>{props.error?.message}</span>
    </div>
  );
};
export default RGenderPicker;

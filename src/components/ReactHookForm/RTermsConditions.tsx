import { FieldError, UseFormRegister } from 'react-hook-form';
import _ from '../Components.module.css';
import { ValidateUser } from '../../types';

interface Props {
  register: UseFormRegister<ValidateUser>;
  error: FieldError | undefined;
}

const RTermsConditions = (props: Props) => {
  return (
    <div className={_.formUnit}>
      <label htmlFor="terms" className={_.terms}>
        <input type="checkbox" id="terms" className={_.mr10} {...props.register('terms')} />
        Terms and Conditions
      </label>
      <span className={`${_.error} ${_.pr55}`}>{props.error?.message}</span>
    </div>
  );
};
export default RTermsConditions;

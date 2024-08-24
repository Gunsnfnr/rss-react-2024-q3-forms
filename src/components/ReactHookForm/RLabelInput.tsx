import { FieldError, UseFormRegister } from 'react-hook-form';
import _ from '../Components.module.css';
import { ValidateUser } from '../../types';

interface Props {
  type: 'text' | 'number' | 'email' | 'password';
  name: 'name' | 'age' | 'email' | 'password' | 'confirmPassword';
  register: UseFormRegister<ValidateUser>;
  error: FieldError | undefined;
}

const RLabelInput = (props: Props) => {
  return (
    <div className={_.formUnit}>
      <label htmlFor={`${props.name}`} className={_[props.name]}>
        {`${props.name}`}
        <input type={`${props.type}`} id={`${props.name}`} {...props.register(`${props.name}`)} />
      </label>
      <span className={_.error}>{props.error?.message}</span>
    </div>
  );
};
export default RLabelInput;

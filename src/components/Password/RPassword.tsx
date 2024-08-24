import { useState } from 'react';
import _ from '../Components.module.css';
import ratePassword from './ratePassword';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { ValidateUser } from '../../types';

interface Props {
  register: UseFormRegister<ValidateUser>;
  error: FieldError | undefined;
  passwordInputValue: string;
}

const RPassword = (props: Props) => {
  const [strength, setStrength] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  return (
    <div className={_.formUnit}>
      <label htmlFor="password" className={_.password}>
        password
        <div>
          {passwordValue && <span className={`${_.strength}`}>(Strength: {strength}) </span>}
          <input
            type="password"
            id="password"
            value={passwordValue}
            {...props.register('password')}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (!e.target) return null;
              setPasswordValue(e.target.value);
              console.log(props.passwordInputValue);
              setStrength(ratePassword(e.target.value));
            }}
          />
        </div>
      </label>
      <span className={_.error}>{props.error?.message}</span>
    </div>
  );
};
export default RPassword;

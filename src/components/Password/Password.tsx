import { useState } from 'react';
import _ from '../Components.module.css';
import ratePassword from './ratePassword';

interface Props {
  refName: React.RefObject<HTMLInputElement>;
  error: string;
}

const Password = (props: Props) => {
  const [strength, setStrength] = useState('');

  return (
    <div className={_.formUnit}>
      <label htmlFor="password" className={_.password}>
        password
        <div>
          {props.refName.current?.value && <span className={`${_.strength}`}>(Strength: {strength}) </span>}
          <input
            type="password"
            id="password"
            name="password"
            ref={props.refName}
            onChange={() => setStrength(ratePassword(props.refName.current?.value))}
          />
        </div>
      </label>
      <span className={_.error}>{props.error}</span>
    </div>
  );
};
export default Password;

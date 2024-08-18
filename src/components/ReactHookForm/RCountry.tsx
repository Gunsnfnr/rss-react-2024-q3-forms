import { useSelector } from 'react-redux';
import _ from '../Components.module.css';
import { RootState } from '../../store';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { ValidateUser } from '../../types';

interface Props {
  register: UseFormRegister<ValidateUser>;
  error: FieldError | undefined;
}
const RCountry = (props: Props) => {
  const countries = useSelector((state: RootState) => state.countriesSlice.countries);

  return (
    <div className={_.formUnit}>
      <label htmlFor="country" className={_.country}>
        Country
        <input list="countries" id="country" {...props.register('country')} />
        <datalist id="countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
      </label>
      <span className={_.error}>{props.error?.message}</span>
    </div>
  );
};

export default RCountry;

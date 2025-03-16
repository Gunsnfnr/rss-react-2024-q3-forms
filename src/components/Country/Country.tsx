import { useSelector } from 'react-redux';
import _ from '../Components.module.css';
import { RootState } from '../../store';

interface Props {
  refName: React.RefObject<HTMLInputElement>;
  error: string;
}
const Country = (props: Props) => {
  const countries = useSelector((state: RootState) => state.countriesSlice.countries);

  return (
    <div className={_.formUnit}>
      <label htmlFor="country" className={_.country}>
        Country
        <input list="countries" id="country" name="country" ref={props.refName} />
        <datalist id="countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
      </label>
      <span className={_.error}>{props.error}</span>
    </div>
  );
};

export default Country;

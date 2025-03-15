import _ from '../Components.module.css';
interface Props {
  refName: React.RefObject<HTMLInputElement>[];
  error: string;
}
const GenderPicker = (props: Props) => {
  return (
    <div className={_.formUnit}>
      <div className={_.gender}>
        <span>Gender</span>

        <div className={_.genders}>
          <label htmlFor="gender_m" className={_.pr70}>
            Male
            <input type="radio" id="gender_m" name="gender" value="male" ref={props.refName[0]} defaultChecked />
          </label>
          <label htmlFor="gender_f">
            Female
            <input type="radio" id="gender_f" name="gender" value="female" ref={props.refName[1]} />
          </label>
        </div>
      </div>
      <span className={_.error}>{props.error}</span>
    </div>
  );
};
export default GenderPicker;

import _ from '../Components.module.css';

interface Props {
  refName: React.RefObject<HTMLInputElement>;
  error: string;
}

const TermsConditions = (props: Props) => {
  return (
    <div className={_.formUnit}>
      <label htmlFor="terms" className={_.terms}>
        <input type="checkbox" id="terms" name="terms" className={_.mr10} ref={props.refName} />
        Terms and Conditions
      </label>
      <span className={`${_.error} ${_.pr55}`}>{props.error}</span>
    </div>
  );
};
export default TermsConditions;

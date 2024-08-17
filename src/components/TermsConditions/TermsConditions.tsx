import _ from '../Form1/Form1.module.css';

interface Props {
  refName: React.RefObject<HTMLInputElement>;
  error: string;
}

export default function TermsConditions(props: Props) {
  return (
    <div className={_.formUnit}>
      <label htmlFor="terms" className={_.terms}>
        <input type="checkbox" id="terms" name="terms" className={_.mr10} ref={props.refName} />
        Terms and Conditions
      </label>
      <span className={`${_.error} ${_.pr55}`}>{props.error}</span>
    </div>
  );
}

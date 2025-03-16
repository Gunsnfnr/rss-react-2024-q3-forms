import _ from '../Components.module.css';

interface Props {
  type: 'text' | 'number' | 'email' | 'password';
  name: string;
  refName: React.RefObject<HTMLInputElement>;
  error: string;
}

const LabelInput = (props: Props) => {
  return (
    <div className={_.formUnit}>
      <label htmlFor={`${props.name}`} className={_[props.name]}>
        {`${props.name}`}
        <input type={`${props.type}`} id={`${props.name}`} name={`${props.name}`} ref={props.refName} />
      </label>
      <span className={_.error}>{props.error}</span>
    </div>
  );
};
export default LabelInput;

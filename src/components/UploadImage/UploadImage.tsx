import _ from '../Components.module.css';

interface Props {
  refName: React.RefObject<HTMLInputElement>;
  error: string;
}
const UploadImage = (props: Props) => {
  return (
    <div className={_.formUnit}>
      <label htmlFor="image" className={_.image}>
        Image
        <input className={_.uploadImage} type="file" name="image" accept="image/png, image/jpeg" ref={props.refName} />
      </label>
      <span className={_.error}>{props.error}</span>
    </div>
  );
};
export default UploadImage;

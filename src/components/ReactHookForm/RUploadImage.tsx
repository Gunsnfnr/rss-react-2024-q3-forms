import { FieldError, UseFormRegister } from 'react-hook-form';
import _ from '../Components.module.css';
import { ValidateUser } from '../../types';

interface Props {
  register: UseFormRegister<ValidateUser>;
  error: FieldError | undefined;
}
const RUploadImage = (props: Props) => {
  return (
    <div className={_.formUnit}>
      <label htmlFor="image" className={_.image}>
        Image
        <input className={_.uploadImage} type="file" accept="image/png, image/jpeg" {...props.register('image')} />
      </label>
      <span className={_.error}>{props.error?.message}</span>
    </div>
  );
};
export default RUploadImage;

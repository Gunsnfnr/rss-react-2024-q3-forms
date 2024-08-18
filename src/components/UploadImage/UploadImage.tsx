import _ from '../Components.module.css';

const UploadImage = () => {
  return (
    <div className={_.formUnit}>
      <input className={_.uploadImage} type="file" name="image" id="image" accept="image/png, image/jpeg" />
      <span className={_.error}></span>
    </div>
  );
};
export default UploadImage;

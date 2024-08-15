import { Link } from 'react-router-dom';

const Form1 = () => {
  return (
    <>
      <div>Form #1 - uncontrolled components</div>
      <div>
        Back to <Link to="/">the Main page</Link>
      </div>
    </>
  );
};
export default Form1;

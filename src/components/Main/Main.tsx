import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <>
      <div>Main</div>
      <div>
        <Link to="/form1">Form1 (uncontrolled components)</Link>
      </div>
      <div>
        <Link to="/form2">Form2 (React Hook Form)</Link>
      </div>
    </>
  );
};
export default Main;

import { Link } from 'react-router-dom';
import UsersOutput from '../UsersOutput/UsersOutput';

const Main = () => {
  return (
    <>
      <h2>React forms</h2>
      <div>
        <Link to="/form1">Form1 (uncontrolled components)</Link>
      </div>
      <div>
        <Link to="/form2">Form2 (React Hook Form)</Link>
      </div>
      <UsersOutput />
    </>
  );
};
export default Main;

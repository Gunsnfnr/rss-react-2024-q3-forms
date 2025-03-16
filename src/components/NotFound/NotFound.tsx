import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <div>Wrong URL</div>
      <div>
        Back to <Link to="/">the Main page</Link>
      </div>
    </>
  );
};
export default NotFound;

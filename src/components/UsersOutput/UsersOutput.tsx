import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import _ from '../Components.module.css';

const UsersOutput = () => {
  const users = useSelector((state: RootState) => state.users.users);
  return (
    <>
      {users.length > 0 && <div className={_.usersTitle}>Users:</div>}
      <div className={_.usersListed}>
        {users.map((elem) => (
          <div className={_.userItem} key={`${elem.email}${elem.name}${elem.name}`}>
            {Object.entries(elem).map(([key, value]) =>
              key === 'image' && typeof value === 'string' ? (
                <div className={_.userItemSubstring} key={key}>
                  <span className={_.bold}>{`${key}: `}</span>
                  <img src={value} alt="Image preview" className={_.userImage} />
                </div>
              ) : (
                <div className={_.userItemSubstring} key={key}>
                  <span className={_.bold}>{`${key}: `}</span>
                  {`${value}`}
                </div>
              ),
            )}
          </div>
        ))}
      </div>
    </>
  );
};
export default UsersOutput;

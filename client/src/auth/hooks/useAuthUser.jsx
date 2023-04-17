import { useContext } from 'react';
import AuthContext from '../contexts/AuthProvider';

const useAuthUser = () => {
  return useContext(AuthContext);
};

export default useAuthUser;

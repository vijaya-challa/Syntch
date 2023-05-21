import { createContext, useState } from 'react';
import { signOut } from 'firebase/auth';
import auth from 'firebaseConfig';
import ROLES from '../Roles';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState();
  const [authError, setAuthError] = useState();
  const [loading, setLoading] = useState(false);

  const userSignOut = async () => {
    try {
      await signOut(auth);
      console.log('Signed out successfully');
    } catch (error) {
      console.log(error);
    }
  };

  const addUserToBackEnd = async (token) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ roles: [ROLES.User] })
    });
    return response;
  };

  const isAdmin = () => {
    return authUser?.roles?.includes(ROLES.Admin);
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        userSignOut,
        addUserToBackEnd,
        authError,
        setAuthError,
        isAdmin,
        loading,
        setLoading
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

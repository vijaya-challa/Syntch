import { createContext, useState } from 'react';
import { signOut } from 'firebase/auth';
import auth from 'firebaseConfig';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState({});
  const [authError, setAuthError] = useState();

  const userSignOut = async () => {
    try {
      await signOut(auth);
      console.log('Signed out successfully');
    } catch (error) {
      console.log(error);
    }
  };

  const addUserToBackEnd = async (token, roles) => {
    const response = await fetch('http://localhost:5000/user/create', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ roles })
    });
    return response;
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        userSignOut,
        addUserToBackEnd,
        authError,
        setAuthError
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

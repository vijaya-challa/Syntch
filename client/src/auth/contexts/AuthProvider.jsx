import { createContext, useState } from 'react';
import { signOut } from 'firebase/auth';
import auth from 'firebaseConfig';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState({});

  const userSignOut = async () => {
    try {
      await signOut(auth);
      console.log('Signed out successfully');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, userSignOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import auth from 'firebaseConfig';
// import SignOut from 'auth/components/SignOut';
import useAuthUser from 'auth/hooks/useAuthUser';
import ROLES from 'auth/Roles';
import { NavLink, useNavigate } from 'react-router-dom';
import Dashboard from 'auth/components/Dashboard';
// import { Avatar } from '@mui/material';

function AuthDetails() {
  const { authUser, setAuthUser, isAdmin } = useAuthUser();

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        let roles = [ROLES.User];
        try {
          const res = await fetch(`${process.env.REACT_APP_BACKEND}/user/roles`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.accessToken}`
            }
          });
          const jsonData = await res.json();
          roles = jsonData.roles;
        } catch (err) {
          console.log(err);
        }
        setAuthUser({ ...user, roles });
        // user.getIdToken().then((token) => {
        //   fetchData(token);
        // });

        navigate('/');
      } else {
        setAuthUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {authUser ? (
        <>
          <Dashboard />
          <div>
            <NavLink to="/tasksection">Task Section</NavLink>
          </div>
          {isAdmin() ? (
            <div>
              <NavLink to="/admin">Admin Section</NavLink>
            </div>
          ) : undefined}
        </>
      ) : undefined}
    </div>
  );
}

export default AuthDetails;

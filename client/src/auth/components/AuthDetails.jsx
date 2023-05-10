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
  const { authUser, setAuthUser } = useAuthUser();

  const navigate = useNavigate();
  // const fetchData = async (token) => {
  //   const resJson = await fetch('http://localhost:5000/user', {
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   });
  //   const res = await resJson.json();
  //   console.log(res);
  // };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser({ ...user, roles: [ROLES.User] });
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
        </>
      ) : undefined}
    </div>
  );
}

export default AuthDetails;

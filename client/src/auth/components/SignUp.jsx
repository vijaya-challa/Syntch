import { useState } from 'react';
import auth from 'firebaseConfig';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  getAdditionalUserInfo
} from 'firebase/auth';
// import { NavLink } from 'react-router-dom';
import useAuthUser from 'auth/hooks/useAuthUser';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import AuthDetails from './AuthDetails';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { addUserToBackEnd } = useAuthUser();
  const navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name
      });
      const userInfo = await getAdditionalUserInfo(userCredential);
      if (userInfo.isNewUser) {
        await addUserToBackEnd(userCredential.user.accessToken);
      }
      console.log(userCredential);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        mt: 2,
        pr: 3,
        pl: 3,
        bgcolor: 'background.paper',
        borderRadius: 2
      }}>
      <AuthDetails />
      <div className="container signup">
        <form onSubmit={signUp} className="container">
          <h1>Create Account</h1>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-password-input"
            label="Email"
            autoComplete="current-password"
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" size="medium" type="submit">
            Sign Up
          </Button>
        </form>
        <Box sx={{ mt: 2 }}>
          Already have an account?
          <Button
            variant="text"
            color="primary"
            sx={{ mb: 2, mt: 2, fontSize: 18, fontWeight: 'bold' }}
            onClick={() => {
              navigate('/login');
            }}>
            Login
          </Button>
          {/* <NavLink to="/login">Login</NavLink> */}
        </Box>
      </div>
    </Box>
  );
}

export default SignUp;

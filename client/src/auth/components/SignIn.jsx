import { useState } from 'react';
import auth from 'firebaseConfig';
import { getAdditionalUserInfo, signInWithEmailAndPassword } from 'firebase/auth';
import GoogleSignIn from 'auth/components/GoogleSignIn';
import { NavLink } from 'react-router-dom';
import GithubSignIn from 'auth/components/GithubSignIn';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AuthDetails from './AuthDetails';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userInfo = getAdditionalUserInfo(userCredential);

      console.log(userInfo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ width: 400, height: 500, backgroundColor: '#555555', m: 4 }}>
      <AuthDetails />

      <div className="container">
        <form onSubmit={signIn} className="container">
          <h1>Log In</h1>

          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
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
            Login
          </Button>
        </form>
        <div>Or</div>

        <GoogleSignIn />
        <GithubSignIn />
        <div>Or</div>
        <div>
          <div>Do you want to create an account?</div>
          <NavLink to="/register">Register</NavLink>
        </div>
      </div>
    </Box>
  );
}

export default SignIn;

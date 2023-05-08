import { useState } from 'react';
import auth from 'firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AuthDetails from './AuthDetails';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name
      });
      console.log(userCredential);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ width: 400, height: 500, backgroundColor: '#555555', m: 4 }}>
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
        <div>
          <div>Already have an account?</div>
          <NavLink to="/login">Login</NavLink>
        </div>
      </div>
    </Box>
  );
}

export default SignUp;

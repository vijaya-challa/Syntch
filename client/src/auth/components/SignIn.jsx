import { useState } from 'react';
import auth from 'firebaseConfig';
import { getAdditionalUserInfo, signInWithEmailAndPassword } from 'firebase/auth';
import GoogleSignIn from 'auth/components/GoogleSignIn';
import { useNavigate } from 'react-router-dom';
import GithubSignIn from 'auth/components/GithubSignIn';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Alert } from '@mui/material';
import useAuthUser from 'auth/hooks/useAuthUser';
import AuthDetails from './AuthDetails';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authError, setAuthError } = useAuthUser();
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userInfo = getAdditionalUserInfo(userCredential);
      setAuthError(null);
      console.log(userInfo);
    } catch (err) {
      console.log(err);
      setAuthError(err.message);
    }
  };

  return (
    <div>
      <Box
        sx={{
          mt: 2,
          pr: 3,
          pl: 3,
          bgcolor: 'background.paper',
          borderRadius: 2
        }}>
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
            <Button variant="contained" size="medium" type="submit" sx={{ mb: 2 }}>
              Login
            </Button>
          </form>
          <div>Or</div>
          <Box>
            <GoogleSignIn />
            <GithubSignIn />
          </Box>
          <div>Or</div>
          <Box sx={{ mb: 2 }}>
            <div>
              Do you want to create an account?{' '}
              <Button
                variant="text"
                color="primary"
                sx={{ fontSize: 18, fontWeight: 'bold' }}
                onClick={() => {
                  navigate('/register');
                }}>
                Register
              </Button>
            </div>

            {/* <NavLink to="/register">Register</NavLink> */}
          </Box>
          <div>Or</div>
          <Button
            variant="text"
            color="primary"
            sx={{ mb: 2, mt: 2, fontSize: 18, fontWeight: 'bold' }}
            onClick={() => {
              navigate('/tasksection');
            }}>
            Try
          </Button>
          {/* <NavLink to="/tasksection">TRY</NavLink> */}
        </div>
      </Box>
      {authError ? (
        <Alert severity="error" className="">
          {authError}
        </Alert>
      ) : undefined}
    </div>
  );
}

export default SignIn;

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import useAuthUser from 'auth/hooks/useAuthUser';
import auth from 'firebaseConfig';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  deleteUser,
  EmailAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup
} from 'firebase/auth';
import { Alert } from '@mui/material';

function DeleteAccount() {
  const { authUser } = useAuthUser();

  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const deleteProfileHandler = async (e) => {
    e.preventDefault();
    let userCred;
    try {
      if (authUser.providerData[0]?.providerId === GoogleAuthProvider.PROVIDER_ID) {
        userCred = await reauthenticateWithPopup(auth.currentUser, new GoogleAuthProvider());
        console.log('delete google');
      } else if (authUser.providerData[0]?.providerId === GithubAuthProvider.PROVIDER_ID) {
        userCred = await reauthenticateWithPopup(auth.currentUser, new GithubAuthProvider());
        console.log('delete github');
      } else {
        const credential = EmailAuthProvider.credential(authUser.email, password);
        userCred = await reauthenticateWithCredential(auth.currentUser, credential);
      }

      if (userCred) {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/delete`, {
          method: 'DELETE',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userCred.user.accessToken}`
          }
        });
        console.log(response);
        await deleteUser(auth.currentUser);

        navigate('/login');
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <Box
        sx={{
          mt: 2,
          pr: 3,
          pl: 3,
          pb: 3,
          bgcolor: 'action.disabledBackground',
          borderRadius: 2
        }}>
        <div className="container signup">
          <form
            onSubmit={(e) => {
              deleteProfileHandler(e);
            }}
            className="container">
            <h1>Delete Account</h1>
            {authUser.providerData[0]?.providerId === EmailAuthProvider.PROVIDER_ID ? (
              <TextField
                id="outlined-basic"
                type="password"
                label="Password"
                variant="outlined"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            ) : undefined}

            <Button variant="contained" color="warning" size="medium" type="submit" sx={{ mt: 5 }}>
              Delete
            </Button>
          </form>
        </div>
      </Box>
      {error ? (
        <Alert severity="error" className="">
          {error}
        </Alert>
      ) : undefined}
    </div>
  );
}

export default DeleteAccount;

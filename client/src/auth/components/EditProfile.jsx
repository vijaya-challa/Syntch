import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import useAuthUser from 'auth/hooks/useAuthUser';
import { Avatar } from '@mui/material';
import { useState } from 'react';
import { updateProfile } from 'firebase/auth';
import auth from 'firebaseConfig';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
  const { authUser } = useAuthUser();
  const [photo, setPhoto] = useState(authUser.photoURL);
  const [name, setName] = useState(authUser.displayName);
  const navigate = useNavigate();

  const uploadPhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhoto(reader.result);
    };
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    await updateProfile(auth.currentUser, { displayName: name, photoURL: photo });
    navigate('/');
  };

  const deleteHandler = () => {
    navigate('/deleteprofile');
  };

  return (
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
            updateProfileHandler(e);
          }}
          className="container">
          <h1>Update Profile</h1>

          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            defaultValue={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          {/* <TextField
            id="outlined-password-input"
            label="Email"
            autoComplete="current-password"
            defaultValue={email}
            margin="normal"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          /> */}

          <Button component="label" sx={{ mt: 1 }}>
            <Avatar sx={{ width: 150, height: 150 }} src={photo} />
            <input type="file" hidden onChange={(e) => uploadPhoto(e)} accept="image/*" />
          </Button>

          <Button variant="contained" size="medium" type="submit" sx={{ mt: 2 }}>
            Update
          </Button>
          <Button
            variant="contained"
            color="warning"
            size="medium"
            sx={{ mt: 5 }}
            onClick={deleteHandler}>
            Delete My Account
          </Button>
        </form>
      </div>
    </Box>
  );
}

export default EditProfile;

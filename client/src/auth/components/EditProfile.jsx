import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import useAuthUser from 'auth/hooks/useAuthUser';
import { Avatar } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth, { storage } from 'firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { enqueueSnackbar } from 'notistack';

function EditProfile() {
  const { authUser, setAuthUser, loading, setLoading } = useAuthUser();
  const [photo, setPhoto] = useState(authUser.photoURL);
  const [name, setName] = useState(authUser.displayName);
  const [imageFile, setImageFile] = useState(null);

  const navigate = useNavigate();

  const uploadPhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Preview
        setPhoto(reader.result);
      };
    }
  };

  const updateProfileHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    let url = null;
    if (imageFile) {
      const imageRef = ref(storage, authUser.uid);
      try {
        await uploadBytes(imageRef, imageFile);
        url = await getDownloadURL(imageRef);
        // console.log(url);
      } catch (err) {
        console.log(err);
        enqueueSnackbar('Failed to upload the picture.', { variant: 'error' });
      }
    }

    try {
      const payload = { displayName: name };
      if (url) {
        payload.photoURL = url;
      }
      await updateProfile(auth.currentUser, payload);

      setAuthUser({ ...authUser, ...auth.currentUser });
      enqueueSnackbar('Successully updated profile.', { variant: 'success' });
    } catch (err) {
      console.log(err);
      enqueueSnackbar('Something went wrong! Failed to update profile.', { variant: 'error' });
    }
    setImageFile(null);
    setLoading(false);
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
          <Button disabled={loading} variant="contained" size="medium" type="submit" sx={{ mt: 2 }}>
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

import {
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  TableCell,
  Typography,
  TableBody,
  TextField,
  Button,
  Box
} from '@mui/material';
import { useEffect, useState } from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useSnackbar } from 'notistack';
import useAuthUser from '../../hooks/useAuthUser';
import AdminNav from './AdminNav';

function Users() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');

  const { authUser } = useAuthUser();
  const { enqueueSnackbar } = useSnackbar();

  const updateUsers = async () => {
    async function fetchData() {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/all`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authUser.accessToken}`
          }
        });
        const jsonData = await response.json();
        setUsers(jsonData);
      } catch (err) {
        console.log(err);
        enqueueSnackbar('Failed to update Users. Something went wrong', { variant: 'error' });
      }
    }

    fetchData();
  };

  useEffect(() => {
    updateUsers();
  }, []);

  const addAdminRole = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/admin-add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authUser.accessToken}`
        },
        body: JSON.stringify({ email })
      });
      await response.json();
      setEmail('');
      enqueueSnackbar('Admin added', { variant: 'success' });
    } catch (err) {
      console.log(err);
      enqueueSnackbar('Failed to add admin. Something went wrong.', { variant: 'error' });
    }

    updateUsers();
  };

  const addAdminShortcut = async (emailId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/admin-add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authUser.accessToken}`
        },
        body: JSON.stringify({ email: emailId })
      });
      await response.json();
      setEmail('');
      enqueueSnackbar('Admin added', { variant: 'success' });
    } catch (err) {
      console.log(err);
      enqueueSnackbar('Failed to add admin. Something went wrong.', { variant: 'error' });
    }

    updateUsers();
  };

  const removeAdminRole = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/admin-remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authUser.accessToken}`
        },
        body: JSON.stringify({ email })
      });
      await response.json();
      setEmail('');
      enqueueSnackbar('Admin removed', { variant: 'warning' });
    } catch (err) {
      console.log(err);
      enqueueSnackbar('Failed to remove admin. Something went wrong.', { variant: 'error' });
    }

    updateUsers();
  };

  const removeAdminShortcut = async (emailId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/admin-remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authUser.accessToken}`
        },
        body: JSON.stringify({ email: emailId })
      });
      await response.json();
      setEmail('');
      enqueueSnackbar('Admin removed', { variant: 'warning' });
    } catch (err) {
      console.log(err);
      enqueueSnackbar('Failed to remove admin. Something went wrong.', { variant: 'error' });
    }

    updateUsers();
  };

  return (
    <div>
      <AdminNav />
      <Typography variant="h5" sx={{ textAlign: 'center' }}>
        Users
      </Typography>
      <div className="adminContainer">
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 2 }}>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            variant="contained"
            color="success"
            startIcon={<PersonAddIcon />}
            onClick={addAdminRole}>
            Add Admin Role
          </Button>
          <Button
            variant="contained"
            color="warning"
            endIcon={<PersonRemoveIcon />}
            onClick={removeAdminRole}>
            Remove Admin Role
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Email</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Roles</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => {
                return (
                  <TableRow key={user.email}>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.displayName}</TableCell>
                    <TableCell>{user.roles.join(', ')}</TableCell>
                    <TableCell align="center">
                      {user.roles.includes('admin') ? (
                        <Button
                          variant="text"
                          color="warning"
                          // eslint-disable-next-line no-underscore-dangle
                          onClick={() => removeAdminShortcut(user.email)}>
                          Remove
                        </Button>
                      ) : (
                        <Button
                          variant="text"
                          color="success"
                          // eslint-disable-next-line no-underscore-dangle
                          onClick={() => addAdminShortcut(user.email)}>
                          ADD
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Users;

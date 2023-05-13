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
import useAuthUser from '../../hooks/useAuthUser';
import AdminNav from './AdminNav';

function Users() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const { authUser } = useAuthUser();

  const updateUsers = async () => {
    async function fetchData() {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authUser.accessToken}`
        }
      });
      const jsonData = await response.json();
      setUsers(jsonData);
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
      const jsonData = await response.json();
      console.log(jsonData);
    } catch (err) {
      console.log(err);
    }
    setEmail('');
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
      const jsonData = await response.json();
      console.log(jsonData);
    } catch (err) {
      console.log(err);
    }
    setEmail('');
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
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => {
                return (
                  <TableRow key={user.email}>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.displayName}</TableCell>
                    <TableCell>{user.roles.join(', ')}</TableCell>
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

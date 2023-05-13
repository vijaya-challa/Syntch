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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import useAuthUser from '../../hooks/useAuthUser';
import AdminNav from './AdminNav';

function Levels() {
  const [levels, setLevels] = useState([]);
  const [levelName, setLevelName] = useState('');
  const { authUser } = useAuthUser();

  const updateLevels = async () => {
    async function fetchData() {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/level/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authUser.accessToken}`
        }
      });
      const jsonData = await response.json();
      setLevels(jsonData);
    }
    fetchData();
  };

  useEffect(() => {
    updateLevels();
  }, []);

  const addLevel = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/level/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authUser.accessToken}`
        },
        body: JSON.stringify({ name: levelName })
      });
      const jsonData = await response.json();
      console.log(jsonData);
    } catch (err) {
      console.log(err);
    }
    setLevelName('');
    updateLevels();
  };

  const removeLevel = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/level/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authUser.accessToken}`
        },
        body: JSON.stringify({ name: levelName })
      });
      const jsonData = await response.json();
      console.log(jsonData);
    } catch (err) {
      console.log(err);
    }
    setLevelName('');
    updateLevels();
  };

  return (
    <div>
      <AdminNav />
      <Typography variant="h5" sx={{ textAlign: 'center' }}>
        Levels
      </Typography>
      <div className="adminContainer">
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <TextField
            label="Level Name"
            variant="outlined"
            value={levelName}
            onChange={(e) => setLevelName(e.target.value)}
            sx={{ mr: 2 }}
          />
          <Button
            variant="contained"
            color="success"
            startIcon={<AddCircleOutlineIcon />}
            onClick={addLevel}
            sx={{ ml: 2 }}>
            Add Level
          </Button>
          <Button
            variant="contained"
            color="warning"
            endIcon={<RemoveCircleOutlineIcon />}
            onClick={removeLevel}
            sx={{ ml: 2 }}>
            Remove Level
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Level Name</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {levels.map((level) => {
                return (
                  <TableRow key={level.name}>
                    <TableCell>{level.name}</TableCell>
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

export default Levels;

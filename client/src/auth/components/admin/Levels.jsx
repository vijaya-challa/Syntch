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
// import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useSnackbar } from 'notistack';
import useAuthUser from '../../hooks/useAuthUser';
import AdminNav from './AdminNav';

function Levels() {
  const [levels, setLevels] = useState([]);
  const [levelName, setLevelName] = useState('');
  const [timerCount, setTimerCount] = useState('');
  const [blanksCount, setBlanksCount] = useState('');
  const [defaultPoints, setDefaultPoints] = useState('');

  const { authUser } = useAuthUser();
  const { enqueueSnackbar } = useSnackbar();

  const updateLevels = async () => {
    async function fetchData() {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/level/all`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authUser.accessToken}`
          }
        });
        const jsonData = await response.json();
        setLevels(jsonData);
      } catch (err) {
        console.log(err);
        enqueueSnackbar('Failed to update Levels. Something went wrong', { variant: 'error' });
      }
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
        body: JSON.stringify({
          name: levelName,
          timerCount,
          blanksCount,
          defaultPoints
        })
      });
      await response.json();
      setLevelName('');
      setTimerCount('');
      setBlanksCount('');
      setDefaultPoints('');

      enqueueSnackbar('Level added', { variant: 'success' });
    } catch (err) {
      console.log(err);
      enqueueSnackbar('Failed to add level. Something went wrong.', { variant: 'error' });
    }

    updateLevels();
  };

  // const removeLevel = async () => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_BACKEND}/level/delete`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${authUser.accessToken}`
  //       },
  //       body: JSON.stringify({ name: levelName })
  //     });
  //     await response.json();
  //     setLevelName('');
  //     enqueueSnackbar('Level removed', { variant: 'warning' });
  //   } catch (err) {
  //     console.log(err);
  //     enqueueSnackbar('Failed to remove level. Something went wrong.', { variant: 'error' });
  //   }

  //   updateLevels();
  // };

  const removeLevelById = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/level/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authUser.accessToken}`
        },
        body: JSON.stringify({ id })
      });
      await response.json();
      setLevelName('');
      enqueueSnackbar('Level removed', { variant: 'warning' });
    } catch (err) {
      console.log(err);
      enqueueSnackbar('Failed to remove level. Something went wrong.', { variant: 'error' });
    }

    updateLevels();
  };

  return (
    <div>
      <AdminNav />
      <Typography variant="h5" sx={{ textAlign: 'center' }}>
        Levels
      </Typography>
      <div className="adminContainer">
        <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <TextField
              label="Level Name"
              variant="outlined"
              value={levelName}
              onChange={(e) => setLevelName(e.target.value)}
              sx={{ mr: 1 }}
            />
            <TextField
              label="Timer Count in ms"
              variant="outlined"
              value={timerCount}
              onChange={(e) => setTimerCount(e.target.value)}
              sx={{ ml: 1 }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <TextField
              label="Number of Blanks"
              variant="outlined"
              value={blanksCount}
              onChange={(e) => setBlanksCount(e.target.value)}
              sx={{ mr: 1 }}
            />
            <TextField
              label="Default Points"
              variant="outlined"
              value={defaultPoints}
              onChange={(e) => setDefaultPoints(e.target.value)}
              sx={{ ml: 1 }}
            />
          </Box>
          <Button
            size="large"
            variant="contained"
            color="success"
            startIcon={<AddCircleOutlineIcon />}
            onClick={addLevel}
            sx={{ width: '75%' }}>
            Add Level
          </Button>

          {/* <Button
            variant="contained"
            color="warning"
            endIcon={<RemoveCircleOutlineIcon />}
            onClick={removeLevel}
            sx={{ ml: 2 }}>
            Remove Level
          </Button> */}
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Name</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">Timer (in ms)</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">Blanks</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">Points</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {levels.map((level) => {
                return (
                  <TableRow key={level.name}>
                    <TableCell>{level.name}</TableCell>
                    <TableCell align="right">{level.timerCount}</TableCell>
                    <TableCell align="right">{level.blanksCount}</TableCell>
                    <TableCell align="right">{level.defaultPoints}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="text"
                        color="warning"
                        // eslint-disable-next-line no-underscore-dangle
                        onClick={() => removeLevelById(level._id)}>
                        Remove
                      </Button>
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

export default Levels;

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
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import { useEffect, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useSnackbar } from 'notistack';
import useAuthUser from '../../hooks/useAuthUser';
import AdminNav from './AdminNav';

function Tasks() {
  const [levels, setLevels] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [level, setLevel] = useState('');
  const [description, setDescription] = useState('');
  const [snippet, setSnippet] = useState('');

  const { authUser } = useAuthUser();
  const { enqueueSnackbar } = useSnackbar();

  const updateTasks = async () => {
    async function fetchData() {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/task/all`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authUser.accessToken}`
          }
        });
        const jsonData = await response.json();
        setTasks(jsonData);
      } catch (err) {
        console.log(err);
        enqueueSnackbar('Failed to update Tasks. Something went wrong', { variant: 'error' });
      }
    }
    fetchData();
  };

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
        enqueueSnackbar('Failed to update levels. Something went wrong', { variant: 'error' });
      }
    }
    fetchData();
  };

  useEffect(() => {
    updateLevels();
    updateTasks();
  }, []);

  const addTask = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/task/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authUser.accessToken}`
        },
        body: JSON.stringify({ description, snippet, level })
      });
      await response.json();
      setLevel('');
      setDescription('');
      setSnippet('');
      enqueueSnackbar('Task added', { variant: 'success' });
    } catch (err) {
      console.log(err);
      enqueueSnackbar('Please check your inputs', { variant: 'error' });
    }
    updateTasks();
  };

  const removeTask = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/task/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authUser.accessToken}`
        },
        body: JSON.stringify({ id })
      });
      await response.json();
      enqueueSnackbar('Task removed', { variant: 'warning' });
    } catch (err) {
      console.log(err);
      enqueueSnackbar('Failed to remove task', { variant: 'error' });
    }
    updateTasks();
  };

  return (
    <div>
      <AdminNav />
      <Typography variant="h5" sx={{ textAlign: 'center' }}>
        Tasks
      </Typography>
      <div className="adminContainer">
        <Box>
          <FormControl
            variant="outlined"
            sx={{
              minWidth: '150px',
              mb: 2
            }}>
            <InputLabel id="level-label">Level</InputLabel>
            <Select
              id="level-label"
              value={level}
              label="Level"
              onChange={(e) => setLevel(e.target.value)}>
              {levels.map((lev) => {
                return (
                  // eslint-disable-next-line no-underscore-dangle
                  <MenuItem key={lev._id} value={lev._id}>
                    {lev.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            sx={{ width: '100%', mb: 2 }}
          />
          <TextField
            label="Snippet"
            variant="outlined"
            value={snippet}
            onChange={(e) => setSnippet(e.target.value)}
            multiline
            rows={5}
            sx={{ width: '100%', mb: 2 }}
          />
        </Box>

        <Button
          variant="contained"
          color="success"
          startIcon={<AddCircleOutlineIcon />}
          onClick={addTask}
          sx={{ mb: 2 }}>
          Add Task
        </Button>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Description</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Snippet</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Level</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => {
                return (
                  // eslint-disable-next-line no-underscore-dangle
                  <TableRow key={task._id}>
                    <TableCell sx={{ maxWidth: '350px' }}>{task.description}</TableCell>
                    <TableCell sx={{ maxWidth: '350px' }}>{task.snippet}</TableCell>
                    <TableCell>{task.level?.name}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="text"
                        color="warning"
                        // eslint-disable-next-line no-underscore-dangle
                        onClick={() => removeTask(task._id)}>
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

export default Tasks;

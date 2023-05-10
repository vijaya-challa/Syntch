import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import CircularProgressWithLabel from 'common/components/CircularProgressWithLabel';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as uuid from 'uuid';

import { useEffect, useState } from 'react';

function Dashboard() {
  const [levels, setLevels] = useState([]);
  const getLevels = () => {
    return [
      { title: 'Beginner', totalTasks: 15, finishedTasks: 15, currentScore: 50, maxScore: 300 },
      { title: 'Intermediate', totalTasks: 15, finishedTasks: 5, currentScore: 20, maxScore: 500 },
      { title: 'Advanced', totalTasks: 15, finishedTasks: 0, currentScore: 0, maxScore: 800 }
    ];
  };

  useEffect(() => {
    const l = getLevels();
    setLevels(l);
  }, []);

  return (
    <Box
      sx={{
        gap: 2,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      {levels.map((level) => {
        return (
          <Card
            key={uuid.v4()}
            sx={{ m: 2, border: 1, borderColor: 'primary.main' }}
            align="center">
            <CardActionArea>
              <CardHeader
                title={level.title}
                titleTypographyProps={{ color: 'secondary', fontWeight: 'bold' }}
              />
              <CardContent>
                <Typography variant="h6">Lorem ipsum dolor sit amet.</Typography>
              </CardContent>
              <CardContent>
                <TableContainer>
                  <Table
                    sx={{ [`& .${tableCellClasses.root}`]: { borderBottom: 'none' } }}
                    size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">
                          <Typography variant="h6">FINISHED</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6">SCORE</Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell align="center">
                          {level.finishedTasks} of {level.totalTasks}
                        </TableCell>
                        <TableCell align="center">
                          {level.currentScore} of {level.maxScore}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center">
                          <CircularProgressWithLabel
                            value={(level.finishedTasks / level.totalTasks) * 100}
                            variant="determinate"
                            color="secondary"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <CircularProgressWithLabel
                            value={(level.currentScore / level.maxScore) * 100}
                            variant="determinate"
                            color="secondary"
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </CardActionArea>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
              {level.finishedTasks === 0 ? (
                <Button variant="contained">Play</Button>
              ) : level.finishedTasks === level.totalTasks ? (
                <Button variant="contained">Replay</Button>
              ) : (
                <>
                  <Button variant="contained">Resume</Button>
                  <Button variant="contained">Reset</Button>
                </>
              )}
            </CardActions>
          </Card>
        );
      })}
    </Box>
  );
}

export default Dashboard;

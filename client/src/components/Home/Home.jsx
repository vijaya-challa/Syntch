/* eslint-disable */
import React, { useState, useEffect } from 'react';
import './home_style.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import syntch_logo from '../../assets/images/syntch_logo.png';
import { Button, ButtonGroup } from '@mui/material';

function Home() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 5,
        p: 5,
        bgcolor: 'background.paper',
        borderRadius: 2
      }}>
      <img src={syntch_logo} alt="Syntch Logo" style={{ color: 'white', width: '250px' }} />

      <ButtonGroup variant="text" color="secondary" sx={{ mt: 2 }}>
        <Button onClick={() => navigate('/howtoplay')}>How To Play</Button>
        <Button onClick={() => navigate('/tasksection')}>Try</Button>
        <Button onClick={() => navigate('/login')}>Login</Button>
        <Button onClick={() => navigate('/register')}>Register</Button>
      </ButtonGroup>
    </Box>
  );
}

export default Home;

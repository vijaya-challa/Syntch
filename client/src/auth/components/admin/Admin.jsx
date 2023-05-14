import { Typography } from '@mui/material';
import React from 'react';
import AdminNav from './AdminNav';

function Admin() {
  return (
    <div>
      <AdminNav />
      <Typography variant="h5">Admin Page</Typography>
    </div>
  );
}

export default Admin;

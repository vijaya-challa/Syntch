import { Typography } from '@mui/material';
import AdminNav from './AdminNav';

function Users() {
  return (
    <div>
      <AdminNav />
      <div className="centerBox">
        <Typography variant="h5">Users</Typography>
      </div>
    </div>
  );
}

export default Users;

import { Route, Routes } from 'react-router-dom';
import './App.css';
import AuthDetails from 'auth/components/AuthDetails';
import SignIn from 'auth/components/SignIn';
import SignUp from 'auth/components/SignUp';
import Layout from 'auth/components/Layout';
import Unauthorized from 'auth/components/Unauthorized';
import Users from 'auth/components/admin/Users';
import RequireAuth from 'auth/components/RequireAuth';
import Dashboard from 'auth/components/Dashboard';
import ROLES from 'auth/Roles';
import Missing from 'auth/components/Missing';
import TaskSection from 'gameSection/TaskSection/TaskSection';
import EditProfile from 'auth/components/EditProfile';
import DeleteAccount from 'auth/components/DeleteAccount';
import Admin from './auth/components/admin/Admin';
import Tasks from './auth/components/admin/Tasks';
import Levels from './auth/components/admin/Levels';
import Home from './components/Home/Home';
import HowPlay from './components/HowPlay/HowPlay';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* PUBLIC routes */}
        <Route path="landingpage" element={<Home />} />
        <Route path="login" element={<SignIn />} />
        <Route path="howtoplay" element={<HowPlay />} />
        <Route path="register" element={<SignUp />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="tasksection" element={<TaskSection />} />

        {/* PROTECTED routes */}

        {/* USER + ADMIN */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>
          <Route path="/" element={<AuthDetails />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/tasksection" element={<TaskSection />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/deleteprofile" element={<DeleteAccount />} />
        </Route>

        {/* ADMIN */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/levels" element={<Levels />} />
          <Route path="/admin/tasks" element={<Tasks />} />
        </Route>

        {/* CATCH MISSING */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;

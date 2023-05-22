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
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { createContext, useState, useMemo } from 'react';
import Admin from './auth/components/admin/Admin';
import Tasks from './auth/components/admin/Tasks';
import Levels from './auth/components/admin/Levels';
import Home from './components/Home/Home';
import HowPlay from './components/HowPlay/HowPlay';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const [mode, setMode] = useState('dark');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      }
    }),
    []
  );
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                // palette values for light mode
                background: {
                  paper: '#95b7b7',
                  default: '#b3cbcb'
                },
                primary: {
                  // light: '#757ce8',
                  main: '#5c8a8a'
                  // dark: '#002884',
                  // contrastText: '#fff'
                }
                // secondary: {
                //   light: '#ff7961',
                //   main: '#f44336',
                //   dark: '#ba000d',
                //   contrastText: '#000'
                // }
              }
            : {
                // palette values for dark mode
                background: {
                  paper: '#424242',
                  default: '#212121'
                }
                // primary: {
                //   light: '#757ce8',
                //   main: '#3f50b5',
                //   dark: '#002884',
                //   contrastText: '#fff'
                // },
                // secondary: {
                //   light: '#ff7961',
                //   main: '#f44336',
                //   dark: '#ba000d',
                //   contrastText: '#000'
                // }
              }),
          contrastThreshold: 4.5
        }
      }),
    [mode]
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={5}>
          <Routes>
            <Route path="landingpage" element={<Home />} />
            <Route path="/" element={<Layout colorModeContext={ColorModeContext} />}>
              {/* PUBLIC routes */}
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
        </SnackbarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

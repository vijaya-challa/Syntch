import { Outlet } from 'react-router-dom';
import Navbar from 'common/components/Navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';

const darkTheme = createTheme({
  palette: { mode: 'dark' }
});

// const lightTheme = createTheme({
//   palette: { mode: 'light' }
// });

function Layout() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={5}>
        <main className="App">
          <Navbar />
          <div className="centerBox">
            <Outlet />
          </div>
        </main>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default Layout;

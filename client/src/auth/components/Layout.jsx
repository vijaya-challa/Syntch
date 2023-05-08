import { Outlet } from 'react-router-dom';
import Navbar from 'common/components/Navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

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
      <main className="App">
        <Navbar />
        <div className="centerBox">
          <Outlet />
        </div>
      </main>
    </ThemeProvider>
  );
}

export default Layout;

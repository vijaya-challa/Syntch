import { Outlet } from 'react-router-dom';
import Navbar from 'common/components/Navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: { mode: 'dark' }
});

// const lightTheme = createTheme({
//   palette: { mode: 'light' }
// });

function Layout() {
  return (
    <ThemeProvider theme={darkTheme}>
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

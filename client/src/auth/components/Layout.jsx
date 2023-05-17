import { Outlet } from 'react-router-dom';
import Navbar from 'common/components/Navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { createContext, useState, useMemo } from 'react';

// const darkTheme = createTheme({
//   palette: { mode: 'light' }
// });

// const lightTheme = createTheme({
//   palette: { mode: 'light' }
// });

const ColorModeContext = createContext({ toggleColorMode: () => {} });

function Layout() {
  const [mode, setMode] = useState('light');
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
          <main className="App">
            <Navbar colorModeContext={ColorModeContext} />
            <div className="centerBox">
              <Outlet />
            </div>
          </main>
        </SnackbarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Layout;

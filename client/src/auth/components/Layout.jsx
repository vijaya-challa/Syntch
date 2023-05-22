import { Outlet } from 'react-router-dom';
import Navbar from 'common/components/Navbar';

function Layout(props) {
  const { colorModeContext } = props;

  return (
    <main className="App">
      <Navbar colorModeContext={colorModeContext} />
      <div className="centerBox">
        <Outlet />
      </div>
    </main>
  );
}

export default Layout;

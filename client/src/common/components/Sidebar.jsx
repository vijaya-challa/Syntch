import useAuthUser from 'auth/hooks/useAuthUser';

function Sidebar() {
  const { authUser } = useAuthUser();
  return (
    <div>
      <h1>Hi {authUser.displayName}</h1>
      <h3>Lets Play</h3>
    </div>
  );
}

export default Sidebar;

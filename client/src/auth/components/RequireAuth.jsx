import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuthUser from 'auth/hooks/useAuthUser';

function RequireAuth({ allowedRoles }) {
  const { authUser } = useAuthUser();
  const location = useLocation();
  return authUser?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : authUser?.email ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;

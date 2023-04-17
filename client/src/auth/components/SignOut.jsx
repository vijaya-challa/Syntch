import { signOut } from 'firebase/auth';
import auth from 'firebaseConfig';

function SignOut() {
  const userSignOut = async () => {
    try {
      await signOut(auth);
      console.log('Signed out successfully');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button type="submit" onClick={userSignOut}>
      Sign Out
    </button>
  );
}

export default SignOut;

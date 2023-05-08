import auth from 'firebaseConfig';
import useAuthUser from 'auth/hooks/useAuthUser';
import ROLES from 'auth/Roles';
import { getAdditionalUserInfo, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import GoogleButton from 'react-google-button';

function GoogleSignIn() {
  const { addUserToBackEnd, setAuthError } = useAuthUser();
  const signIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const userInfo = getAdditionalUserInfo(userCredential);
      if (userInfo.isNewUser) {
        await addUserToBackEnd(userCredential.user.accessToken, [ROLES.User]);
      }
    } catch (error) {
      console.log(error);
      setAuthError(error.message);
    }
  };

  return (
    <div className="container signin">
      <GoogleButton type="dark" onClick={() => signIn()}>
        Google
      </GoogleButton>
    </div>
  );
}

export default GoogleSignIn;

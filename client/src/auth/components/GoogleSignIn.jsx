import auth from 'firebaseConfig';
import { getAdditionalUserInfo, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import GoogleButton from 'react-google-button';

function GoogleSignIn() {
  const signIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const userInfo = getAdditionalUserInfo(userCredential);
      console.log(userInfo);
    } catch (error) {
      console.log(error);
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

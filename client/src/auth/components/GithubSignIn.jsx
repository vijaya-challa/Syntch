import auth from 'firebaseConfig';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import GithubButton from 'react-github-login-button';

function GithubSignIn() {
  const signIn = async () => {
    try {
      const provider = new GithubAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      console.log(userCredential);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container signin">
      <GithubButton type="dark" onClick={() => signIn()}>
        GitHub
      </GithubButton>
    </div>
  );
}

export default GithubSignIn;

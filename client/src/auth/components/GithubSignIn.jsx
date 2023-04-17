import auth from 'firebaseConfig';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';

function GithubSignIn() {
  const signIn = async (e) => {
    e.preventDefault();
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
      <form onSubmit={signIn}>
        <button type="submit">GitHub</button>
      </form>
    </div>
  );
}

export default GithubSignIn;

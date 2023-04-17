import auth from 'firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

function GoogleSignIn() {
  const signIn = async (e) => {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      console.log(userCredential);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container signin">
      <form onSubmit={signIn}>
        <button type="submit">Google</button>
      </form>
    </div>
  );
}

export default GoogleSignIn;

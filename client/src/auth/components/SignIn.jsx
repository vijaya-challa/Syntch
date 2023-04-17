import { useState } from 'react';
import auth from 'firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import GoogleSignIn from 'auth/components/GoogleSignIn';
import { NavLink } from 'react-router-dom';
import GithubSignIn from 'auth/components/GithubSignIn';
import AuthDetails from './AuthDetails';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AuthDetails />
      <div className="container signin">
        <form onSubmit={signIn} className="container">
          <h1>Log In</h1>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Log In</button>
        </form>
        <div>Or</div>
        <div>Login using</div>
        <GoogleSignIn />
        <GithubSignIn />
        <div>Or</div>
        <div>
          <div>Do you want to create an account?</div>
          <NavLink to="/register">Register</NavLink>
        </div>
      </div>
    </>
  );
}

export default SignIn;

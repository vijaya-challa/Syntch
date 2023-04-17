import { useState } from 'react';
import auth from 'firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { NavLink } from 'react-router-dom';
import AuthDetails from './AuthDetails';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name
      });
      console.log(userCredential);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AuthDetails />
      <div className="container signup">
        <form onSubmit={signUp} className="container">
          <h1>Create Account</h1>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <button type="submit">Sign Up</button>
        </form>
        <div>
          <div>Already have an account?</div>
          <NavLink to="/login">Login</NavLink>
        </div>
      </div>
    </>
  );
}

export default SignUp;

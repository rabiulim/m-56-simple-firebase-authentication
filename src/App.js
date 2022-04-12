
import './App.css';
import app from './firebase.init';
import { FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { useState } from 'react';


const auth = getAuth(app)
function App() {
  const [user, setUser] = useState({})
  const provider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const fasebookProvider = new FacebookAuthProvider();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        setUser(user)
        console.log(user)
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  const handleFasebookSignIn = () => {
    signInWithPopup(auth, fasebookProvider)
      .then(result => {
        const user = result.user;
        setUser(user)
        console.log(user)
      })
      .catch(error => {
        console.error(error)
      })
  }
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({})
      })
      .catch(error => {
        setUser({})
      })
  }
  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const user = result.user;
        setUser(user)
        console.log(user);
      })
      .catch(error => {
        console.log(error)
      })
  }
  return (
    <div className="App">
      {
        user.uid ? <button onClick={handleSignOut}>Sing Out</button> :
          <div>
            <button onClick={handleGoogleSignIn}>Google Sign In</button>
            <button onClick={handleFasebookSignIn}>Fasebook Sign In</button>
            <button onClick={handleGithubSignIn}>GitHub Sign In</button>
          </div>
      }
      <h2>Name:{user.displayName}</h2>
      <p>I know your email:{user.email}</p>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;

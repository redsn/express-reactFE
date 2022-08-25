import './App.css';
import Header from "./components/Header";
import Main from "./components/Main";
import { onAuthStateChanged, auth } from './firebase';
import { useState, useEffect } from 'react';

function App() {
  const [ userState, setUserState ] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,  user => {setUserState(user)});
    return unsubscribe;

    // return () => {
    //   unsubscribe()
    // }
  }, [])

  return (
    <div className="App">
      <Header user={userState} />
      <Main user={userState} />
    </div>
  );
}

export default App;

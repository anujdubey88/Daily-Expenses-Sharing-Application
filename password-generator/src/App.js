import logo from './logo.svg';
import './App.css';
import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const [length,setlength]=useState(6);
  const [charAllowed ,setcharAllowed]=useState(false);
  const [intAllowed, setintAllowed]=useState(false)

  const passwordRef=useRef("");
  const [password, setPassword] = useState('');

  const generatePassword = useCallback(()=>{
    let password = '';
    let allpasschar="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqurstuvwxyz";
    if(charAllowed) allpasschar+="~!@#$%^&*()_+-=\|,.?";
    if(intAllowed)  allpasschar+="0123456789";
    for(let i=0;i<length;i++){
      password+=allpasschar.charAt(Math.floor(Math.random()*allpasschar.length));
    }
    setPassword(password);
    
  },[length,charAllowed,intAllowed,setPassword])


  const copypassword = useCallback(() => {
    const input = passwordRef.current;
    if (input && input.select) {
      input.select();
      window.navigator.clipboard.writeText(password)
        .then(() => {
          console.log('Password copied to clipboard!');
        })
        .catch((err) => {
          console.error('Failed to copy password: ', err);
        });
    } else {
      console.error('passwordRef.current is not an input element');
    }
  }, [password]);

  useEffect(()=>{
    generatePassword()
  },[length,charAllowed,intAllowed,setPassword])

  return (
    <div className="App">
        <h1>Password Generator</h1>
        <div className='section'>
          <div className='password'>
            <input type="text" id="password" ref={passwordRef} name="password" value={password} readOnly />
            <button className='copybuttton' onClick={copypassword()}>Copy</button>
          </div>
          <div className='input'>
            <div><input type='range' value={length} onChange={(e)=> setlength(Number(e.target.value))} min={6} max={100}/>
            <label>Length : {length}</label></div>
            <div><input type="checkbox" defaultValue={charAllowed} onChange={(e)=> setcharAllowed(e.target.checked)}/>
            <label htmlFor="charAllowed">Include Charecter</label></div>
            <div><input type="checkbox" defaultValue={intAllowed} onChange={(e)=> setintAllowed(e.target.checked)}/>
            <label htmlFor="intAllowed">Include Integer</label></div>
          </div>
        </div>
    </div>
  );
}

export default App;

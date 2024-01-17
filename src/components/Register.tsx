import {useState, ChangeEvent, FormEvent} from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom';

function Register() {
    const [userCredentials, setUserCredentials] = useState<{password:string, email:string}>({password:"", email:""});
    const navigate = useNavigate();

    function handleInputChange(e: ChangeEvent<HTMLInputElement>){
        if(e.target.name === "password"){
            setUserCredentials({...userCredentials, password: e.target.value});
        }
        else{
            setUserCredentials({...userCredentials, email: e.target.value});
        }
    }

    function handleSubmit(e: FormEvent){
        e.preventDefault();
        createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password).then((userCredential) =>{
            console.log(userCredential.user);
            navigate("/");
        } ).catch((error) =>{
            console.log(error);
            alert("There was an error. Please check your network and try again");
        })
    }
  return (
    <div className='login-cont'>
      <form action="/" onSubmit={handleSubmit}>
        <h1>REGISTER</h1>
        <label htmlFor="email">Enter your email</label>
        <input type="email" name="email" id="email" value={userCredentials.email} onInput={handleInputChange} required/>

        <label htmlFor="password">Enter your password</label>
        <input type="password" name="password" id="password" value={userCredentials.password} onInput={handleInputChange} required/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Register

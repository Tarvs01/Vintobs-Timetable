import {useState, ChangeEvent, FormEvent} from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';

function Register() {
    const [userCredentials, setUserCredentials] = useState<{password:string, email:string}>({password:"", email:""});
    const [isLoading, setIsLoading] = useState(false);
    const [errorText, setErrorText] = useState("");
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
        setIsLoading(true);
        setErrorText("");
        createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password).then((userCredential) =>{
            console.log(userCredential.user);
            setIsLoading(false);
            navigate("/");
        } ).catch((error) =>{
            setIsLoading(false);
            setErrorText("There was an error. Try again");
            console.log(error);
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

        {isLoading && <BounceLoader color='#4818e8' size={40} cssOverride={{margin: "0 auto"}} />}
        <div className='error-text'>{errorText}</div>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Register

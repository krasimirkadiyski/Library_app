import React, {useState} from "react";
import LoginModel from "../../models/LoginModel";



export const LoginPage = () => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    async function loginUser(event: any) {
        event.preventDefault();

        console.log(event);
        const url = `http://localhost:8080/api/login`;
        if (username !== '' && password !== '') {
            const messageRequestModel: LoginModel = new LoginModel(username, password);
            console.log(messageRequestModel);
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageRequestModel)
            };

            const submitNewQuestionResponse = await fetch(url, requestOptions);
            if (!submitNewQuestionResponse.ok) {
                throw new Error('Something went wrong!');
            }

            setUsername('');
            setPassword('');
            setDisplayWarning(false);
            setDisplaySuccess(true);
        } else {
            setDisplayWarning(true);
            setDisplaySuccess(false);
        }
    }

   
    return (
        <form>
  <div className="form-group">
    <label>username</label>
    <input type="text" onChange={e => setUsername(e.target.value)} value={username} className="form-control"  name="username" id="username" aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="usernameHelp" className="form-text text-muted">Enter your username</small>
  </div>
  <div className="form-group">
    <label >Password</label>
    <input type="password"  onChange={e => setPassword(e.target.value)} value={password} className="form-control" name="password" id="password" placeholder="Password"/>
  </div>
  <div className="form-group form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" >Check me out</label>
  </div>
  <button onClick={loginUser} type="submit" className="btn btn-primary">Submit</button>
</form>
        );
};


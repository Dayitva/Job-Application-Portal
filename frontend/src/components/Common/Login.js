import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/auth';

function Login(props) {
    
    const user = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function onChangeEmail(event) {
        await setEmail(event.target.value);
    }

    async function onChangePassword(event) {
        await setPassword(event.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();

        const checkUser = {
            email: email,
            password: password
        }

        axios.post('http://localhost:4000/user/login', checkUser)
             .then(res => {
                    user.login(res.data);
                    alert("Logged in!");
                    props.history.push('/profile')
                })
             .catch(err => {
                    alert(err.response.data.error);
                });
    }

    return (
        <div>
            <h1><u> Login </u></h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Email: </label>
                    <input type="email" 
                            className="form-control" 
                            value={email}
                            onChange={onChangeEmail}
                            required
                            />  
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input type="password" 
                            className="form-control" 
                            value={password}
                            onChange={onChangePassword}
                            required
                            />
                </div>

                <div className="form-group">
                    <input type="submit" value="Login" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
}

export default Login;
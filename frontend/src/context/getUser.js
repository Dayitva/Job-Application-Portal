import { useState } from 'react';
import axios from 'axios'

function GetUser() {

	const [user, setUser] = useState('');

	axios.get('http://localhost:4000/user/me', { 
      headers: { 
          "token": localStorage.getItem("token") ? localStorage.getItem("token").split(" ")[1] : ""
      }}).then(res => {
          setUser(res.data);
	  }).catch(err => {console.log(err)})
	  
	return (
		user
	);
}

export default GetUser;
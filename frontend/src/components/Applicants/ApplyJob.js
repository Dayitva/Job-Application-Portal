import React, { useState } from 'react';
import axios from 'axios';
import GetUser from '../../context/getUser'
import NavbarApplicant from "../templates/NavbarApplicant"

function ApplyJob(props) {

    const user = GetUser()
    
    const [sop, setSOP] = useState('');

    async function onChangeSOP(event) {
        await setSOP(event.target.value);
    }

    if(sop.split(" ").length > 250)
    {
        alert("SOP must be less than 250 words");
        setSOP("")
    }

    function onSubmit(e) {
        e.preventDefault();

        const job = {
            _id: user._id,
            email: user.email,
            sop: sop
        }

        const updatedUser = {
            _id: props.match.params.jobId
        }

        axios.post('http://localhost:4000/job/addApp/'+props.match.params.jobId, job)
             .then(res => {
                    console.log("Applied!");
                    // props.history.push('/applications')
                })
             .catch(err => {
                    alert(err.response.data.error);
                });

        axios.post('http://localhost:4000/user/addJob/'+user._id, updatedUser)
            .then(res => {
                    alert("Applied!");
                    props.history.push('/applications')
                })
            .catch(err => {
                    alert(err.response.data.error);
                });
    }

    return (
        <div>
            <NavbarApplicant /><br />
            <h1><u> Apply </u></h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>SOP: </label>
                    <input type="text" 
                            className="form-control" 
                            value={sop}
                            onChange={onChangeSOP}
                            required
                            />  
                </div>

                <div className="form-group">
                    <input type="submit" value="Submit" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
}

export default ApplyJob;
import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import NavbarRecruiter from '../templates/NavbarRecruiter';

function EditJob(props) {

    const [maxApps, setMaxApps] = useState('');
    const [maxPos, setMaxPos] = useState('');
    const [deadline, setDeadline] = useState('');
    const [job, setJob] = useState({});

    axios.get('http://localhost:4000/job/getJob/'+props.match.params.jobId)
        .then(res => {
            setJob(res.data);
        })
        .catch(function(error) {
            console.log(error);
        })

    async function onChangeMaxApps(event)
    {
        await setMaxApps(event.target.value)
    }

    async function onChangeMaxPos(event)
    {
        await setMaxPos(event.target.value)
    }

    async function onChangeDeadline(event)
    {
        await setDeadline(event)
    }

    function onSubmit(e) {
        e.preventDefault();

        const editJob = {
            maxApps: maxApps,
            maxPos: maxPos,
            deadline: deadline
        }

        axios.post('http://localhost:4000/job/editJob/'+props.match.params.jobId, editJob)
             .then(res => {
                    alert("Details Updated!");
                    props.history.push("/listings");
                })
             .catch(err => {
                    alert(err.response.data.error);
                });
    }

    return (
        <div class="container">
            <NavbarRecruiter /> <br />
            <h1><u> Edit Job </u></h1>
            <form onSubmit={onSubmit}>
            <div className="form-group">
                        <label>Maximum No. of Applications Allowed: </label>
                        <input type="number" 
                               className="form-control" 
                               value={maxApps}
                               onChange={onChangeMaxApps}
                               placeholder={job.maxApplicants}
                               min="1"
                               />
                    </div>
                    <div className="form-group">
                        <label>Maximum No. of Positions Available: </label>
                        <input type="number" 
                               className="form-control" 
                               value={maxPos}
                               onChange={onChangeMaxPos}
                               placeholder={job.maxPositions}
                               min="1"
                               />  
                    </div>
                    <div className="form-group">
                        <label>Deadline: </label><br />
                            <DatePicker
                                showTimeSelect
                                className="form-control"
                                selected={deadline}
                                onChange={onChangeDeadline}
                                dateFormat="Pp"
                                />
                    </div>
                <div className="form-group">
                    <input type="submit" value="Edit" className="btn btn-primary"/>
                </div>
            </form>        
        </div>
    )
}

export default EditJob;
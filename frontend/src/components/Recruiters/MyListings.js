import React, {Component} from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';

import NavbarRecruiter from '../templates/NavbarRecruiter';

class MyListings extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            jobs: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/user/me', { 
            headers: { 
                "token": localStorage.getItem("token") ? localStorage.getItem("token").split(" ")[1] : ""
            }})
             .then(res => {
                this.setState({user: res.data});
            })
             .catch(err => {console.log(err)});

        axios.get('http://localhost:4000/job')
             .then(response => {
                 this.setState({jobs: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    chooseJob(jobId){
        this.props.history.push('/choose-job/'+jobId);
    }

    editJob(jobId){
        this.props.history.push('/edit-job/'+jobId);
    }

    deleteJob(jobId){
        axios.post('http://localhost:4000/job/deleteJob/'+jobId)
             .then(res => {
                 alert("Job deleted!");
                 window.location.reload(false);
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    render() {
        return (
            <div class="container">
                <NavbarRecruiter /> <br />
                {this.state.jobs && this.state.jobs.length !== 0 ?
                <Grid container>
                    <Grid item xs={12} md={12} lg={12}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                            <TableCell>Title</TableCell>
                                            <TableCell>Date of posting</TableCell>
                                            <TableCell>No. of Applications received</TableCell>
                                            <TableCell>Remaining No. of Positions</TableCell>
                                            <TableCell align="center" colSpan={3}>Options for the job listing</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.jobs.map((job,ind) => (
                                        job.email === this.state.user.email ?
                                        <TableRow key={ind}>
                                            <TableCell>{job.title}</TableCell>
                                            <TableCell>{job.dateOfPosting.split("T")[0]}</TableCell>
                                            <TableCell>{job.receivedApplicants.length}</TableCell>
                                            <TableCell>{job.maxPositions - job.noOfAccepted}</TableCell>
                                            <TableCell><Button onClick={() => this.editJob(job['id'] ? job['id'] : job['_id'])}>Edit</Button></TableCell>
                                            <TableCell><Button onClick={() => this.deleteJob(job['id'] ? job['id'] : job['_id'])}>Delete</Button></TableCell>
                                            <TableCell><Button onClick={() => this.chooseJob(job['id'] ? job['id'] : job['_id'])}>Recruit</Button></TableCell>
                                        </TableRow>
                                        : ""
                                ))}
                                </TableBody>
                            </Table>
                        </Paper>               
                    </Grid>    
                </Grid> 
                : "You have no listings currently!" }          
            </div>
        )
    }
}

export default MyListings;
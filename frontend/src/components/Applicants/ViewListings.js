import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import NavbarApplicant from '../templates/NavbarApplicant';

var check = 0;

class JobsList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            jobs: [],
            sortedJobs: [], 
            sortRatingFlag:true, 
            sortSalaryFlag: true, 
            sortDurationFlag: true
        };

        this.renderIconRating = this.renderIconRating.bind(this);
        this.renderIconSalary = this.renderIconSalary.bind(this);
        this.renderIconDuration = this.renderIconDuration.bind(this);
        this.showJob = this.showJob.bind(this);
        this.sortRating = this.sortRating.bind(this);
        this.sortSalary = this.sortSalary.bind(this);
        this.sortDuration = this.sortDuration.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/job')
             .then(response => {
                 this.setState({jobs: response.data, sortedJobs:response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })

        axios.get('http://localhost:4000/user/me', { 
            headers: { 
                "token": localStorage.getItem("token") ? localStorage.getItem("token").split(" ")[1] : ""
            }}).then(res => {
                this.setState({user: res.data});
            }).catch(err => {console.log(err)})
    }

    showJob(jobId){
        console.log(this.state.user._id);

        axios.get('http://localhost:4000/job/checkAccepted/'+ this.state.user._id)
            .then(res => {
                res.data.gotAccepted === 1 ? alert("Can't Apply! You have been accepted to a job!") : this.props.history.push('/apply-job/'+jobId);
            })
            .catch(err => {alert(err.response.data)})
    }

    sortRating()
    {
        var array = this.state.jobs;
        var flag = this.state.sortRatingFlag;
        array.sort(function(a, b) {
            if(a.rating !== undefined && b.rating !== undefined){
                return (1 - flag*2) * (new Date(a.rating) - new Date(b.rating));
            }
            else{
                return 1;
            }
          });
        this.setState({
            jobs:array,
            sortRatingFlag:!this.state.sortRatingFlag,
        })
    }

    sortSalary()
    {
        var array = this.state.jobs;
        var flag = this.state.sortSalaryFlag;
        array.sort(function(a, b) {
            if(a.salary !== undefined && b.salary !== undefined){
                return (1 - flag*2) * (new Date(a.salary) - new Date(b.salary));
            }
            else{
                return 1;
            }
          });
        this.setState({
            jobs:array,
            sortSalaryFlag:!this.state.sortSalaryFlag,
        })
    }

    sortDuration()
    {
        var array = this.state.jobs;
        var flag = this.state.sortDurationFlag;
        array.sort(function(a, b) {
            if(a.duration !== undefined && b.duration !== undefined){
                return (1 - flag*2) * (new Date(a.duration) - new Date(b.duration));
            }
            else{
                return 1;
            }
          });
        this.setState({
            jobs:array,
            sortDurationFlag:!this.state.sortDurationFlag,
        })
    }

    renderIconRating()
    {
        if(this.state.sortRatingFlag)
        {
            return(
                <ArrowDownwardIcon/>
            )
        }
        else
        {
            return(
                <ArrowUpwardIcon/>
            )            
        }
    }

    renderIconSalary()
    {
        if(this.state.sortSalaryFlag)
        {
            return(
                <ArrowDownwardIcon/>
            )
        }
        else
        {
            return(
                <ArrowUpwardIcon/>
            )            
        }
    }

    renderIconDuration()
    {
        if(this.state.sortDurationFlag)
        {
            return(
                <ArrowDownwardIcon/>
            )
        }
        else
        {
            return(
                <ArrowUpwardIcon/>
            )            
        }
    }

    render() {
        return (
            <div class="container">
                <NavbarApplicant /> <br />
                {this.state.jobs && this.state.jobs.length !== 0 ?
                
                <Grid container>
                    <Grid item xs={12} md={12} lg={12}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                            <TableCell>Title</TableCell>
                                            <TableCell>Recruiter Name</TableCell>
                                            <TableCell><Button onClick={this.sortRating}>{this.renderIconRating()}</Button><br />Recruiter Rating</TableCell>
                                            <TableCell><Button onClick={this.sortSalary}>{this.renderIconSalary()}</Button><br />Salary (Rupees)</TableCell>
                                            <TableCell><Button onClick={this.sortDuration}>{this.renderIconDuration()}</Button><br />Duration (months)</TableCell>
                                            <TableCell>Deadline</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody> 
                                    {this.state.jobs.map((job,ind) => (
                                        check = 0,
                                        moment(job.deadline).diff(moment()) > 0 ?
                                        job.receivedApplicants && job.receivedApplicants.map((getjob) => (getjob._id === this.state.user._id ? check = 1: "" )) ?                                            
                                        <TableRow key={ind}>
                                            <TableCell>{job.title}</TableCell>
                                            <TableCell>{job.name}</TableCell>
                                            <TableCell>{job.rating}</TableCell>
                                            <TableCell>{job.salary}</TableCell>
                                            <TableCell>{job.duration}</TableCell>
                                            <TableCell>{job.deadline.split("T")[0]} <br /> {(new Date(job.deadline)).getUTCHours()}:{(new Date(job.deadline)).getUTCMinutes() ? (new Date(job.deadline)).getUTCMinutes() : "00" }</TableCell>
                                            
                                            {this.state.user.jobsApplied && this.state.user.jobsApplied.length < 10 ?
                                            check ?
                                            <TableCell><Button style={{color: 'blue'}}>Applied</Button></TableCell>
                                            :
                                            job.receivedApplicants && job.receivedApplicants.length < job.maxApplicants && job.noOfAccepted < job.maxPositions ?
                                            <TableCell><Button style={{color: 'green'}} onClick={() => this.showJob(job['id'] ? job['id'] : job['_id'])}>Apply</Button></TableCell>
                                            :
                                            <TableCell><Button style={{color: 'red'}}>Full</Button></TableCell>
                                            
                                            : "You cannot apply to more than 10 jobs"}
                                        </TableRow>
                                        : "" : ""
                                        
                                ))}
                                
                                </TableBody>
                            </Table>
                        </Paper>               
                    </Grid>    
                </Grid>
                : "There are no job listings yet!" }         
            </div>
        )
    }
}

export default JobsList;
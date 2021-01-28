import React, { Component } from 'react';
import axios from 'axios';

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

import NavbarRecruiter from '../templates/NavbarRecruiter';

class ChooseJob extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            job: {},
            sortedApplicants: [],
            applicants: [], 
            sortRatingFlag: true, 
            sortNameFlag: true, 
            sortDateFlag: true
        };

        this.renderIconRating = this.renderIconRating.bind(this);
        this.renderIconName = this.renderIconName.bind(this);
        this.renderIconDate = this.renderIconDate.bind(this);
        this.sortRating = this.sortRating.bind(this);
        this.sortName = this.sortName.bind(this);
        this.sortDate = this.sortDate.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/job/getJob/'+ this.props.match.params.jobId)
            .then(res => {
                this.setState({job: res.data});
                axios.post('http://localhost:4000/user/getApps', {applicantIds: this.state.job.receivedApplicants})
                    .then(res => {
                        this.setState({applicants: res.data.users, sortedApplicants: res.data.users});
                        console.log(res.data.users)
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    updateStatus(jobId, status) {

        const job = {
            jobId: jobId,
            status: status
        }

        axios.post('http://localhost:4000/job/updateStatus/'+ this.props.match.params.jobId, job)
             .then(res => {
                    alert("Applicant " + status + "!");
                })
             .catch(err => {
                    alert(err.response.data.error);
                    console.log(err);
                });
    }

    sortName()
    {
        var array = this.state.applicants;
        var flag = this.state.sortNameFlag;
        array.sort(function(a, b) {
            if(a.name !== undefined && b.name !== undefined){
                if(flag)
                {
                    if(a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                    if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                }

                if(!flag)
                {
                    if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                    if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                }
            }

            else{
                return 1;
            }
          });
        
        this.setState({
            applicants:array,
            sortNameFlag:!this.state.sortNameFlag,
        })
    }

    sortDate()
    {
        var array = this.state.job.receivedApplicants;
        var flag = this.state.sortDateFlag;
        array.sort(function(a, b) {
            if(a.dateOfApplication !== undefined && b.dateOfApplication !== undefined){
                return (1 - flag*2) * (new Date(a.dateOfApplication) - new Date(b.dateOfApplication));
            }
            else{
                return 1;
            }
          });

        this.setState({
            sortDateFlag:!this.state.sortDateFlag,
        })
    }

    sortRating()
    {
        var array = this.state.applicants;
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
            applicants: array,
            sortRatingFlag:!this.state.sortRatingFlag,
        })
    }

    renderIconName()
    {
        if(this.state.sortNameFlag)
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

    renderIconDate()
    {
        if(this.state.sortDateFlag)
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

    render() {
    return (
        <div class="container">
            <NavbarRecruiter /> <br />
                {this.state.job.receivedApplicants && this.state.job.receivedApplicants.length !== 0 ?
                <Grid container>
                    <Grid item xs={12} md={12} lg={12}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                            <TableCell><Button onClick={this.sortName}>{this.renderIconName()}</Button><br />Name</TableCell>
                                            <TableCell>Skills</TableCell>
                                            <TableCell><Button onClick={this.sortDate}>{this.renderIconDate()}</Button><br />Date of Application</TableCell>
                                            <TableCell>Education</TableCell>
                                            <TableCell>SOP</TableCell>
                                            <TableCell><Button onClick={this.sortRating}>{this.renderIconRating()}</Button><br />Rating</TableCell>
                                            <TableCell>Stage of Application</TableCell>
                                            <TableCell align="center" colSpan={2}>Options</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { this.state.applicants && this.state.applicants.map((applicant, ind) => (
                                            this.state.job.receivedApplicants[ind].status !== "Rejected" ?
                                            <TableRow key={ind}>
                                                <TableCell>{applicant && applicant.name}</TableCell>
                                                <TableCell>{applicant.skills && applicant.skills.join(', ')}</TableCell>
                                                <TableCell>{this.state.job.receivedApplicants[ind].dateOfApplication && this.state.job.receivedApplicants[ind].dateOfApplication.split("T")[0]}</TableCell>
                                                <TableCell>{applicant.education && applicant.education[0].institution}</TableCell>
                                                <TableCell>{this.state.job.receivedApplicants[ind].sop}</TableCell>
                                                <TableCell>{applicant && applicant.rating}</TableCell>
                                                <TableCell>{this.state.job.receivedApplicants[ind].status}</TableCell>
                                                { this.state.job.receivedApplicants[ind].status === "Applied" ? 
                                                <TableCell ><Button onClick={() => this.updateStatus(this.state.job.receivedApplicants[ind]['id'] ? this.state.job.receivedApplicants[ind]['id'] : this.state.job.receivedApplicants[ind]['_id'], "Shortlisted")}>Shortlist</Button></TableCell>
                                                : "" }
                                                { this.state.job.receivedApplicants[ind].status === "Shortlisted" ? 
                                                <TableCell ><Button onClick={() => this.updateStatus(this.state.job.receivedApplicants[ind]['id'] ? this.state.job.receivedApplicants[ind]['id'] : this.state.job.receivedApplicants[ind]['_id'], "Accepted")}>Accept</Button></TableCell>
                                                : "" }
                                                { this.state.job.receivedApplicants[ind].status !== "Rejected" ?
                                                <TableCell ><Button onClick={() => this.updateStatus(this.state.job.receivedApplicants[ind]['id'] ? this.state.job.receivedApplicants[ind]['id'] : this.state.job.receivedApplicants[ind]['_id'], "Rejected")}>Reject</Button></TableCell>
                                                : "" }    
                                            </TableRow>
                                            : ""
                                        )) }
                                </TableBody>
                            </Table>
                        </Paper>               
                    </Grid>    
                </Grid>
                : "Nobody has applied for this job yet!"}           
            </div>
    )}
}

export default ChooseJob;
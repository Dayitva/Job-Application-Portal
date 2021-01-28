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
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import NavbarRecruiter from '../templates/NavbarRecruiter';

class Employees extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            jobs: [],
            fetchedApplicant: {},
            sortRatingFlag:true, 
            sortNameFlag: true, 
            sortDateFlag: true,
            sortTitleFlag: true
        };

        this.renderIconRating = this.renderIconRating.bind(this);
        this.renderIconName = this.renderIconName.bind(this);
        this.renderIconDate = this.renderIconDate.bind(this);
        this.renderIconTitle = this.renderIconTitle.bind(this);
        this.sortRating = this.sortRating.bind(this);
        this.sortName = this.sortName.bind(this);
        this.sortDate = this.sortDate.bind(this);
        this.sortTitle = this.sortTitle.bind(this);
        this.showApp = this.showApp.bind(this);
        this.submitRating = this.submitRating.bind(this);
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

    showApp(applicantId)
    {
        console.log(applicantId);

        axios.get('http://localhost:4000/user/getApp/'+ applicantId)
            .then(response => {
                this.setState({fetchedApplicant: response.data});
            })
            .catch(function(error) {
                console.log(error);
            })
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

    sortName()
    {
        var array = this.state.jobs;
        var flag = this.state.sortNameFlag;
        array.sort(function(a, b) {
            if(a.name !== undefined && b.name !== undefined){
                return (1 - flag*2) * (new Date(a.name) - new Date(b.name));
            }
            else{
                return 1;
            }
          });
        this.setState({
            jobs:array,
            sortNameFlag:!this.state.sortNameFlag,
        })
    }

    sortTitle()
    {
        var array = this.state.jobs;
        var flag = this.state.sortTitleFlag;
        array.sort(function(a, b) {
            if(a.title !== undefined && b.title !== undefined){
                return (1 - flag*2) * (new Date(a.title) - new Date(b.title));
            }
            else{
                return 1;
            }
          });
        this.setState({
            jobs:array,
            sortTitleFlag:!this.state.sortTitleFlag,
        })
    }

    sortDate()
    {
        var array = this.state.jobs;
        var flag = this.state.sortDateFlag;
        array.sort(function(a, b) {
            if(a.dateOfJoining !== undefined && b.dateOfJoining !== undefined){
                return (1 - flag*2) * (new Date(a.dateOfJoining) - new Date(b.dateOfJoining));
            }
            else{
                return 1;
            }
          });
        this.setState({
            jobs:array,
            sortDateFlag:!this.state.sortDateFlag,
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

    renderIconTitle()
    {
        if(this.state.sortTitleFlag)
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

    submitRating(userId) {
        this.props.history.push('/rate-employee/'+userId);
    }  

    render() {
        return (
            <div class="container">
                <NavbarRecruiter /> <br />
                
                
                <Grid container>
                    <Grid item xs={12} md={12} lg={12}>
                        <Paper>
                            <Table size="large">
                                <TableHead>
                                    <TableRow>
                                            <TableCell><Button onClick={this.sortName}>{this.renderIconName()}</Button><br />Employee Name</TableCell>
                                            <TableCell><Button onClick={this.sortDate}>{this.renderIconDate()}</Button><br />Date of Joining</TableCell>
                                            <TableCell>Job Type</TableCell>
                                            <TableCell><Button onClick={this.sortTitle}>{this.renderIconTitle()}</Button><br />Job Title</TableCell>
                                            <TableCell><Button onClick={this.sortRating}>{this.renderIconRating()}</Button><br />Rating</TableCell>
                                            <TableCell>Rate Employee</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.jobs && this.state.jobs.map((job) => (
                                        job.email == this.state.user.email && job.receivedApplicants && job.receivedApplicants.map((app, ind) => (
                                        app.status == "Accepted" ?
                                        <TableRow key={ind}>
                                            {this.showApp(app._id)}
                                            <TableCell> {this.state.fetchedApplicant ? this.state.fetchedApplicant.name : ""} </TableCell>
                                            <TableCell> {app.dateOfJoining && app.dateOfJoining.split("T")[0]} </TableCell>
                                            <TableCell> {job.typeOfJob} </TableCell>
                                            <TableCell> {job.title} </TableCell>
                                            <TableCell> {this.state.fetchedApplicant ? this.state.fetchedApplicant.rating : ""} </TableCell>
                                            <TableCell> <Button onClick={() => this.submitRating(this.state.fetchedApplicant._id)}>Rate</Button> </TableCell>
                                        </TableRow>
                                        : ""
                                    ))))}
                                </TableBody>
                            </Table>
                        </Paper>               
                    </Grid>    
                </Grid>
                           
            </div>
        )
    }
}

export default Employees;
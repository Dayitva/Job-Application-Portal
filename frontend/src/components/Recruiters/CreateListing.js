import React, {Component} from 'react';
import Select from 'react-select'
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import NavbarRecruiter from '../templates/NavbarRecruiter';

const job_types = [
    {label: 'Full-time', value: 1},
    {label: 'Part-time',value:2},
    {label: 'Work from Home',value:3}
]

const skills_list = [
    {label: 'Python', value: 1},
    {label: 'Java',value: 2},
    {label: 'C', value: 3},
    {label: 'C++',value: 4},
    {label: 'HTML', value: 5},
    {label: 'CSS',value: 6},
    {label: 'JavaScript', value: 7},
    {label: 'TypeScript',value: 8},
    {label: 'Ruby', value: 9},
    {label: 'Swift',value: 10},
    {label: 'Kotlin', value: 11},
    {label: 'Go',value: 12}
]

export default class CreateListing extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            title: '',
            maxApps: '',
            maxPos: '',
            deadline: new Date(),
            skills: '',
            jobType: '',
            duration: '',
            salary: ''
        }

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeMaxApps = this.onChangeMaxApps.bind(this);
        this.onChangeMaxPos = this.onChangeMaxPos.bind(this);
        this.onChangeDeadline = this.onChangeDeadline.bind(this);
        this.onChangeSkills = this.onChangeSkills.bind(this);
        this.onChangeJobType = this.onChangeJobType.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeSalary = this.onChangeSalary.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:4000/user/me', { 
        headers: { 
            "token": localStorage.getItem("token") ? localStorage.getItem("token").split(" ")[1] : ""
        }}).then(res => {
            this.setState({user: res.data});
        }).catch(err => {console.log(err)})
    }
    
    onChangeTitle(event) {
        this.setState({ title: event.target.value });
    }

    onChangeMaxApps(event) {
        this.setState({ maxApps: event.target.value });
    }

    onChangeMaxPos(event) {
        this.setState({ maxPos: event.target.value });
    }

    onChangeDeadline(event) {
        this.setState({ deadline: event });
    }

    onChangeDuration(event) {
        this.setState({ duration: event.target.value });
    }

    onChangeSalary(event) {
        this.setState({ salary: event.target.value });
    }

    onChangeJobType(event) {
        this.setState({ jobType: event.label });
    }

    onChangeSkills(event) {
        var temp_skills = [];

        if(event)
        {
            for(var i = 0; i < event.length; i++)
            {
                temp_skills.push(event[i].label);
            }
        }

        this.setState({ skills: temp_skills });
    }

    

    onSubmit(e) {
        e.preventDefault();

        const newJob = {
            name: this.state.user.name,
            email: this.state.user.email,
            title: this.state.title,
            maxApps: this.state.maxApps,
            maxPos: this.state.maxPos,
            deadline: this.state.deadline,
            skills: this.state.skills,
            jobType: this.state.jobType,
            duration: this.state.duration,
            salary: this.state.salary
        }

        axios.post('http://localhost:4000/job/register', newJob)
             .then(res => {
                alert("Created a new Job listing with title " + res.data.title);
                this.props.history.push('/listings')
            });

        this.setState({
            title: '',
            maxApps: '',
            maxPos: '',
            deadline: '',
            skills: '',
            jobType: '',
            duration: '',
            salary: ''
        });
    }

    render() {
        return (
            <div>
                <NavbarRecruiter />
                <h1><u> Create Lisiting </u></h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Job Title: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.title}
                               onChange={this.onChangeTitle}
                               required
                               />
                    </div>
                    <div className="form-group">
                        <label>Maximum No. of Applications Allowed: </label>
                        <input type="number" 
                               className="form-control" 
                               value={this.state.maxApps}
                               onChange={this.onChangeMaxApps}
                               min="1"
                               required
                               />
                    </div>
                    <div className="form-group">
                        <label>Maximum No. of Positions Available: </label>
                        <input type="number" 
                               className="form-control" 
                               value={this.state.maxPos}
                               onChange={this.onChangeMaxPos}
                               min="1"
                               required
                               />  
                    </div>
                    <div className="form-group">
                        <label>Deadline: </label><br />
                            <DatePicker
                                showTimeSelect
                                className="form-control"
                                selected={this.state.deadline}
                                onChange={this.onChangeDeadline}
                                dateFormat="Pp"
                                />
                    </div>
                    <div className="form-group">
                        <label>Required Skills: </label>
                        <Select
                            closeMenuOnSelect={false}
                            isMulti
                            options={skills_list}
                            onChange={this.onChangeSkills}
                            isSearchable
                        /> 
                    </div>
                    <div className="form-group">
                        <label>Type of Job: </label>
                        <Select
                            closeMenuOnSelect={true}
                            options={job_types}
                            onChange={this.onChangeJobType}
                            isSearchable 
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (in months): </label>
                        <input type="number" 
                               className="form-control" 
                               value={this.state.duration}
                               onChange={this.onChangeDuration}
                               min="0"
                               max="6"
                               required
                               />  
                    </div>
                    <div className="form-group">
                        <label>Salary (per month): </label>
                        <input type="number" 
                            className="form-control" 
                            value={this.state.salary}
                            onChange={this.onChangeSalary}
                            step="1000"
                            required
                            />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Job Listing" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
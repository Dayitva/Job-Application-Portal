import React, {Component} from 'react';
import Select from 'react-select'
import axios from 'axios';

const roles = [
    {label: 'Applicant', value: 1},
    {label: 'Recruiter',value:2}
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

var roleid;

export default class Register extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            role: '',
            email: '',
            password: '',
            confirmPassword: '',
            contact: '',
            bio: '',
            institution: '',
            startYear: '',
            endYear: '',
            skills: ''
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onChangeContact = this.onChangeContact.bind(this);
        this.onChangeBio = this.onChangeBio.bind(this);
        this.onChangeInstitution = this.onChangeInstitution.bind(this);
        this.onChangeStartYear = this.onChangeStartYear.bind(this);
        this.onChangeEndYear = this.onChangeEndYear.bind(this);
        this.onChangeSkills = this.onChangeSkills.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeName(event) {
        this.setState({ name: event.target.value });
    }

    onChangeRole(event) {
        this.setState({ role: event.label });
        roleid = event.label;
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onChangeConfirmPassword(event) {
        this.setState({ confirmPassword: event.target.value });
    }

    onChangeContact(event) {
        this.setState({ contact: event.target.value });
    }

    onChangeBio(event) {
        this.setState({ bio: event.target.value });
        
        if(this.state.bio.split(" ").length > 250)
        {
            alert("Bio must be less than 250 words");
            this.setState({ bio: "" });
        }
    }

    onChangeInstitution(event) {
        this.setState({ institution: event.target.value });
    }

    onChangeStartYear(event) {
        this.setState({ startYear: event.target.value });
    }

    onChangeEndYear(event) {
        this.setState({ endYear: event.target.value });
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

        const newUser = {
            name: this.state.name,
            role: this.state.role,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            contact: this.state.contact,
            bio: this.state.bio,
            institution: this.state.institution,
            startYear: this.state.startYear,
            endYear: this.state.endYear,
            skills: this.state.skills
        }

        axios.post('http://localhost:4000/user/register', newUser)
             .then(res => {
                    alert("Registered " + res.data.name + " as " + res.data.role);
                    this.props.history.push('/login');
                })
             .catch(err => {
                    console.log(err.response.data);
                    if(err.response.data.error.name !== undefined)
                        alert(err.response.data.error.name);
                    if(err.response.data.error.email !== undefined)
                        alert(err.response.data.error.email);
                    if(err.response.data.error.role !== undefined)
                        alert(err.response.data.error.role);
                    if(err.response.data.error.password !== undefined)
                        alert(err.response.data.error.password);
                    if(err.response.data.error.confirmPassword !== undefined)
                        alert(err.response.data.error.confirmPassword);
                    if(err.response.data.userError !== undefined)
                        alert(err.response.data.userError);
                    if(err.response.data.error.institution !== undefined)
                        alert(err.response.data.error.institution);
                    if(err.response.data.error.startYear !== undefined)
                        alert(err.response.data.error.startYear);
                    if(err.response.data.error.endYear !== undefined)
                        alert(err.response.data.error.endYear);
                });

        this.setState({
            name: '',
            role: '',
            email: '',
            password: '',
            confirmPassword: '',
            contact: '',
            bio: '',
            institution: '',
            startYear: '',
            endYear: '',
            skills: ''
        });
    }

    render() {
        return (
            <div>
                <h1><u> Register </u></h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangeName}
                               required
                               />
                    </div>
                    <div className="form-group">
                        <label>Role: <i className="text-danger">required</i></label>
                        <Select
                        // defaultValue={roles.filter(role => role.label === 'Applicant')}
                        closeMenuOnSelect={true}
                        options={roles}
                        onChange={this.onChangeRole}
                        isSearchable 
                        required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="email" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               required
                               />  
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               required
                               />  
                    </div>
                    <div className="form-group">
                        <label>Confirm Password: </label>
                        <input type="password" 
                               className="form-control" 
                               value={this.state.confirmPassword}
                               onChange={this.onChangeConfirmPassword}
                               required
                               />  
                    </div>

                    {roleid === "Recruiter" ? 
                    <div>
                        <div className="form-group">
                            <label>Contact No: </label>
                            <input type="tel" 
                                className="form-control" 
                                value={this.state.contact}
                                onChange={this.onChangeContact}
                                required
                                />  
                        </div>

                        <div className="form-group">
                        <label>Bio: </label>
                        <input type="text" 
                            className="form-control" 
                            value={this.state.bio}
                            onChange={this.onChangeBio}
                            required
                            /> 
                        {/* <textarea 
                            className="form-control" 
                            rows="5"
                            value={this.state.bio}
                            onChange={this.onChangeBio}
                            required>
                        </textarea>  */}
                        </div>
                    </div>: "" }

                    {roleid === "Applicant" ? 
                    <div>
                        <h4>Education (You can edit or add more instances of education and skills later in your profile)</h4>
                        <div className="form-group">
                            <label>Institution: </label>
                            <input type="text" 
                                className="form-control" 
                                value={this.state.institution}
                                onChange={this.onChangeInstitution}
                                required
                                />  
                        </div>

                        <div className="form-group">
                            <label>Start Year: </label>
                            <input type="number" 
                                className="form-control" 
                                value={this.state.startYear}
                                onChange={this.onChangeStartYear}
                                min="1900"
                                max="2100"
                                required
                                />  
                        </div>

                        <div className="form-group">
                            <label>End Year: </label>
                            <input type="number" 
                                className="form-control" 
                                value={this.state.endYear}
                                onChange={this.onChangeEndYear}
                                min="1900"
                                max="2100"
                                />  
                        </div>

                        <div className="form-group">
                        <label>Skills: </label>
                        <Select
                            closeMenuOnSelect={false}
                            isMulti
                            options={skills_list}
                            onChange={this.onChangeSkills}
                        /> 
                        </div>
                    </div>: "" }

                    <div className="form-group">
                        <input type="submit" value="Register" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
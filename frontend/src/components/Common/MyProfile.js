import React, { useContext, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios'
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { AuthContext } from '../../context/auth'
import GetUser from "../../context/getUser"
import NavbarApplicant from '../templates/NavbarApplicant'
import NavbarRecruiter from '../templates/NavbarRecruiter'

function MyProfile(props) {

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

    var user = GetUser();

    const { logout } = useContext(AuthContext);
    
    function logUserOut(){
        logout();
        this.props.push("/");
    }

    const [contact, setContact] = useState('');
    const [bio, setBio] = useState('');
    // const [institution, setInstitution] = useState('');
    // const [startYear, setStartYear] = useState('');
    // const [endYear, setEndYear] = useState('');
    const [skills, setSkills] = useState('');

    const [inputFields, setInputFields] = useState([
        { institution: '', startYear: '' , endYear: ''},
    ]);
    
    async function onChangeContact(event) {
        await setContact(event.target.value);
    }

    async function onChangeBio(event) {
        await setBio(event.target.value);
    }

    // async function onChangeInstitution(event) {
    //     await setInstitution(event.target.value);
    // }

    // async function onChangeStartYear(event) {
    //     await setStartYear(event.target.value);
    // }

    // async function onChangeEndYear(event) {
    //     await setEndYear(event.target.value);
    // }

    async function onChangeSkills(event) {
        var temp_skills = [];

        if(event)
        {
            for(var i = 0; i < event.length; i++)
            {
                temp_skills.push(event[i].label);
            }
        }

        await setSkills(temp_skills);
    }

    const handleInputChange = (inputValue, actionMeta) => {
        console.group('Input Changed');
        console.log(inputValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
    };

    function onSubmit(e) {
        e.preventDefault();

        console.log("inputFields", inputFields);

        const editUser = {
            contact: contact,
            bio: bio,
            // institution: institution,
            // startYear: startYear,
            // endYear: endYear,
            education: inputFields,
            skills: skills
        }

        axios.post('http://localhost:4000/user/editUser/'+user._id, editUser)
             .then(res => {
                alert("Details edited!");
            })
             .catch(err => {
                console.log(err.response.data);
                if(err.response.data.userError !== undefined)
                    alert(err.response.data.userError);
                if(err.response.data.error.contact !== undefined)
                    alert(err.response.data.error.contact);
             });
    }

    if(bio.split(" ").length > 250)
    {
        alert("Bio must be less than 250 words");
        setBio("")
    }

    const handleChangeInput = (index, event) => {
        const values  = [...inputFields];
        values[index][event.target.name] = event.target.value;
        setInputFields(values);
    }

    const handleAddFields = () => {
        setInputFields([...inputFields, { institution: '', startYear: '' , endYear: ''}])
    }
    
    const handleRemoveFields = ind => {
        const values  = [...inputFields];
        values.splice(ind, 1);
        setInputFields(values);
    }

    return (
        <div class="container">
            {user.role === "Recruiter" ? <NavbarRecruiter/> : ""}
            {user.role === "Applicant" ? <NavbarApplicant/> : ""}
            <br />
            Hi, <b>{user.name}</b>! <br />
            Your current details are: <br /><br />
            
            <form onSubmit={onSubmit}>
                    <div className="form-group">
                    <label>Name: </label>
                            <input type="text"
                                className="form-control" 
                                placeholder={user.name}
                                value={user.name}
                                readOnly
                                />  
                    </div>
                    <div className="form-group">
                    <label>Email: </label>
                            <input type="text"
                                className="form-control" 
                                placeholder={user.email}
                                value={user.email}
                                readOnly
                                />  
                    </div>
                    <div className="form-group">
                    <label>Role: </label>
                            <input type="text"
                                className="form-control" 
                                placeholder={user.role}
                                value={user.role}
                                readOnly
                                />  
                    </div>
                    {user.role === "Recruiter" ? 
                    <div>
                        <div className="form-group">
                            <label>Contact No: </label>
                            <input type="number"
                                className="form-control" 
                                placeholder={user.contact}
                                value={contact}
                                onChange={onChangeContact}
                                />  
                        </div>

                        <div className="form-group">
                        <label>Bio: </label>
                        <input type="text" 
                            placeholder={user.bio}
                            className="form-control" 
                            value={bio}
                            onChange={onChangeBio}
                            />
                        </div>
                    </div>: "" }

                    {user.role === "Applicant" ?
                    <div>
                        <h4>Education </h4>
                        {inputFields.map((inputField, ind) => (
                        <div key={ind} class="form-row">
                        <div className="col">
                            <label>Institution {ind+1}: </label>
                            <input type="text" 
                                className="form-control" 
                                placeholder={user.education[ind] && user.education[ind].institution}
                                value={inputField.institution}
                                name="institution"
                                onChange={event => handleChangeInput(ind, event)}
                                />  
                        </div>

                        <div className="col">
                            <label>Start Year: </label>
                            <input type="number" 
                                className="form-control"
                                placeholder={user.education[ind] && user.education[ind].startYear}
                                value={inputField.startYear}
                                name="startYear"
                                onChange={event => handleChangeInput(ind, event)}
                                min="1900"
                                max="2100"
                                />  
                        </div>

                        <div className="col">
                            <label>End Year: </label>
                            <input type="number" 
                                className="form-control"
                                placeholder={user.education[ind] && user.education[ind].endYear}
                                value={inputField.endYear}
                                name="endYear"
                                onChange={event => handleChangeInput(ind, event)}
                                min="1900"
                                max="2100"
                                />  
                        </div>

                        <IconButton disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                            <RemoveIcon />
                        </IconButton>
                        <IconButton onClick={handleAddFields}>
                            <AddIcon />
                        </IconButton>
                        </div>
                        ))}
                        <br />
                        <div className="form-group">
                        <label>Skills: </label>
                        <CreatableSelect
                            closeMenuOnSelect={false}
                            isClearable
                            isMulti
                            onChange={onChangeSkills}
                            onInputChange={handleInputChange}
                            placeholder={user.skills.join(", ")}
                            options={skills_list}
                        />

                        </div>
                    </div>: "" }

                    <div className="form-group">
                        <input type="submit" value="Edit" className="btn btn-primary"/>
                    </div>
                </form>

            <a href="/" onClick={logUserOut}>
                Logout
            </a>
        </div>
    )
}

export default MyProfile;
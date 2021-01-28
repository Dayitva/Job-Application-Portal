import React, {Component} from 'react';
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

export default class NavbarRecruiter extends Component {

    render() {
        return (
            <div>                
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    {/* <Link to="/" className="navbar-brand">Job Portal</Link> */}
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/create-listing" className="nav-link">Dashboard</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/listings" className="nav-link">My Listings</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/employees" className="nav-link">Employees</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/profile" className="nav-link">My Profile</Link>
                            </li>                           
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}
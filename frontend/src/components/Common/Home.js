import React, {Component} from 'react';
import { Link } from "react-router-dom";

export default class Home extends Component {

    render() {
        return (
            <div class="d-flex align-items-center min-vh-100">
                <div class="container">
                    <div class="d-flex justify-content-center">
                        <div className="p-2">
                            <h1>Welcome to Job Application Portal!</h1>
                        </div>
                        </div>
                    <div class="d-flex justify-content-center">
                        <div class="p-2">
                            <button type="button" class="btn btn-warning"><Link to="/register" className="nav-link">Sign Up</Link></button>
                        </div>
                        <div class="p-2">
                            <button type="button" class="btn btn-warning"><Link to="/login" className="nav-link">Login</Link></button>
                        </div>
                    </div>
                </div>
            </div>  
        )
    }
}
import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {
    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink to="/" className="navbar-brand"  >Movie-Point</NavLink>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to="/rentals" className="nav-link" >Rentals <span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/customers" className="nav-link" >Customers</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/login" className="nav-link" >Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/signup" className="nav-link" >SignUp</NavLink>
                        </li>
                    </ul>

                </div>
            </nav>
        </React.Fragment>
    )
}

export default NavBar

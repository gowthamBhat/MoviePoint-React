//! code is incomplete
//! ******************
import React, { Component } from 'react'
import Joi from 'joi-browser';


class LoginForm extends Component {

    state = {
        account: { username: "", password: "" },
        error: {}
    }
    schema = {
        username: Joi.string().required().label('Username'),

        password: Joi.string().required().label('Password')
    };

    validate = () => {
        const { error } = Joi.validate(this.state.account, this.schema, { abortEarly: false });
        // console.log(error.details[0].path[0]);
        if (!error)
            return null;

        const errors = {};

        for (let item of error.details)
            errors[item.path[0]] = item.message;

        return errors;

        // const { account } = this.state;
        // const error = {};
        // if (account.username.trim() === '')
        //     error.username = "User name required";
        // if (account.password.trim() === '')
        //     error.password = "Password required";
        // return Object.keys(error).length === 0 ? null : error;
        //Object.keys returns the array of all the keys in the object
    }
    handleSubmit = e => {
        e.preventDefault();

        const error = this.validate();


        this.setState({ error: error || {} });
        if (error)
            return;

        console.log('submitted');
    }
    handleInput = e => {

        const account = { ...this.state.account }
        account[e.currentTarget.name] = e.currentTarget.value; //state will be set for both username and password whenever user types
        this.setState({ account })

    }
    render() {
        const { account, error } = this.state;
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" onChange={this.handleInput} value={account.username} className="form-control" style={{ "width": "250px" }} id="username" aria-describedby="emailHelp" placeholder="Enter Username" />
                        {error.username && <div className="alert alert-danger" role="alert" style={{ "width": "250px" }}>{error.username}</div>}
                    </div>
                    <div className="form-group ">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" onChange={this.handleInput} value={account.password} className="form-control" style={{ "width": "250px" }} id="password" placeholder="Enter Password" />
                        {error.password && <div className="alert alert-danger" role="alert" style={{ "width": "250px" }}>{error.password}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </React.Fragment>
        )
    }
}

export default LoginForm

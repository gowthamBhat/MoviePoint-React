
import React, { Component } from 'react'
import Joi from 'joi-browser';
import { logging } from './../Services/authService';
import LocalStroageContainer from './../Services/LocalStroageContainer';

class LoginForm extends Component {

    state = {
        account: { email: "", password: "" },
        error: {}
    }
    schema = {
        email: Joi.string().required().label('Email'),
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
        // if (account.email.trim() === '')
        //     error.email = "User name required";
        // if (account.password.trim() === '')
        //     error.password = "Password required";
        // return Object.keys(error).length === 0 ? null : error;
        //Object.keys returns the array of all the keys in the object
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = this.state.account
        const error = this.validate();


        this.setState({ error: error || {} });
        if (error)
            return;

        try {
            const { data: jwt } = await logging(email, password);
            LocalStroageContainer.saveToken(jwt); //implementations are in LocalStroage Module

            // this.props.history.push('/movies');
            window.location = '/'; //this will make the whole window relod when the pages moves
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const error = { ...this.state.error };
                error.email = "Email or Password is Wrong";
                this.setState({ error });
            }
        }
    }
    handleInput = e => {

        const account = { ...this.state.account }
        account[e.currentTarget.name] = e.currentTarget.value; //state will be set for both email and password whenever user types
        this.setState({ account })

    }
    render() {
        const { account, error } = this.state;
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" onChange={this.handleInput} value={account.email} className="form-control" style={{ "width": "250px" }} id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                        {error.email && <div className="alert alert-danger" role="alert" style={{ "width": "250px" }}>{error.email}</div>}
                    </div>
                    <div className="form-group ">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" onChange={this.handleInput} value={account.password} className="form-control" style={{ "width": "250px" }} id="password" placeholder="Enter Password" />
                        {error.password && <div className="alert alert-danger" role="alert" style={{ "width": "250px" }}>{error.password}</div>}
                    </div>
                    <button type="submit" className="btn btn-dark" disabled={this.validate()} >Submit</button>
                </form>
            </React.Fragment>
        )
    }
}
//disabled={this.validate()} in submit button attribute
export default LoginForm

import React, { Component } from 'react';
import Joi from 'joi-browser';
import { register } from './../Services/userService';
import LocalStroageContainer from './../Services/LocalStroageContainer';

class SignUpForm extends Component {

    state = {
        account: { email: "", password: "", name: "" },
        errors: {}
    };

    schema = {
        email: Joi.string().required().label('Email'),
        name: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    }

    validate = () => {

        const { error } = Joi.validate(this.state.account, this.schema, { abortEarly: false });
        const errors = {};
        if (!error)
            return null;
        for (let item of error.details) {
            errors[item.path[0]] = item.message;
        }
        return errors;
    }

    handleInput = e => {

        const account = { ...this.state.account }
        account[e.currentTarget.name] = e.currentTarget.value; //state will be set for both name and password whenever user types
        this.setState({ account })

    }
    handleSUbmit = async (e) => {
        e.preventDefault();
        const result = this.validate();
        this.setState({ errors: result || {} });
        if (result)
            return;
        try {

            const response = await register(this.state.account);
            LocalStroageContainer.saveToken(response.headers['x-auth-token']); //implementations are in LocalStroage Module
            // this.props.history.push('/movies');
            window.location = '/'; //this will make the whole window relod when the pages moves

        } catch (e) {

            if (e.response && e.response.status === 400) {
                const errors = { ...this.state.errors }
                errors.email = "Account Already Exists";
                this.setState({ errors })
            }
        }

    }

    render() {
        const { errors, account } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSUbmit} autoComplete="off">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input type="email" name="email" onChange={this.handleInput} value={account.email} className="form-control" id="exampleInputEmail1" style={{ "width": "250px" }} placeholder="Enter Email" aria-describedby="emailHelp" />
                        {this.state.errors.email && <div className="alert alert-danger" role="alert" style={{ "width": "250px" }}>{errors.email}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" name="password" onChange={this.handleInput} value={account.password} className="form-control" id="exampleInputPassword1" style={{ "width": "250px" }} placeholder="Enter Password" />
                        {this.state.errors.password && <div className="alert alert-danger" role="alert" style={{ "width": "250px" }}>{errors.password}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputName" className="form-label">Username</label>
                        <input type="text" name="name" onChange={this.handleInput} value={account.name} className="form-control" id="exampleInputName" style={{ "width": "250px" }} aria-describedby="emailHelp" placeholder="Enter Username" />
                        {this.state.errors.name && <div className="alert alert-danger" role="alert" style={{ "width": "250px" }}>{errors.name}</div>}
                    </div>
                    <button type="submit" className="btn btn-dark" disabled={this.validate()}>Submit</button>
                </form>
            </div>
        )
    }
}
export default SignUpForm;
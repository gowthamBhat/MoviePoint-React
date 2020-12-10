import React, { Component } from 'react';
import Joi from 'joi-browser';



class SignUpForm extends Component {

    state = {
        account: { email: "", password: "", username: "" },
        errors: {}
    };

    schema = {
        email: Joi.string().required().label('Email'),
        username: Joi.string().required().label('Username'),
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
        account[e.currentTarget.name] = e.currentTarget.value; //state will be set for both username and password whenever user types
        this.setState({ account })

    }
    handleSUbmit = (e) => {
        e.preventDefault();
        const result = this.validate();
        this.setState({ errors: result || {} });
        if (result)
            return;

        console.log('Signup submitted');

    }

    render() {
        const { errors, account } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSUbmit} autoComplete="off">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" name="email" onChange={this.handleInput} value={account.email} className="form-control" id="exampleInputEmail1" style={{ "width": "250px" }} aria-describedby="emailHelp" />
                        {this.state.errors.email && <div className="alert alert-danger" role="alert" style={{ "width": "250px" }}>{errors.email}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" name="password" onChange={this.handleInput} value={account.password} className="form-control" id="exampleInputPassword1" style={{ "width": "250px" }} />
                        {this.state.errors.password && <div className="alert alert-danger" role="alert" style={{ "width": "250px" }}>{errors.password}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputName" className="form-label">Name</label>
                        <input type="text" name="username" onChange={this.handleInput} value={account.username} className="form-control" id="exampleInputName" style={{ "width": "250px" }} aria-describedby="emailHelp" />
                        {this.state.errors.username && <div className="alert alert-danger" role="alert" style={{ "width": "250px" }}>{errors.username}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}
export default SignUpForm;
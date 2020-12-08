//! code is incomplete
//! ******************
import React, { Component } from 'react'

class LoginForm extends Component {

    state = {
        account: { username: "", password: "" }
    }
    handleSubmit = e => {
        e.preventDefault();
        console.log('submitted');
    }
    handleInput = e => {

        const account = { ...this.state.account }
        account[e.currentTarget.name] = e.currentTarget.value; //state will be set for both username and password whenever user types
        this.setState({ account })

    }
    render() {
        const { account } = this.state;
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" onChange={this.handleInput} value={account.username} className="form-control" style={{ "width": "250px" }} id="username" aria-describedby="emailHelp" placeholder="Enter Username" />
                    </div>
                    <div className="form-group ">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" onChange={this.handleInput} value={account.password} className="form-control" style={{ "width": "250px" }} id="password" placeholder="Enter Password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </React.Fragment>
        )
    }
}

export default LoginForm

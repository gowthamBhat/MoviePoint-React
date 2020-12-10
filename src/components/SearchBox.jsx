import React, { Component } from 'react';

export class SearchBox extends Component {


    render() {

        return (
            <div id="SearchBox">
                <form className="form-inline my-2 my-lg-0" onSubmit={e => e.preventDefault()}>
                    <input className="form-control mr-sm-2" type="search" onKeyUp={this.props.onSearch} placeholder="Search" aria-label="Search" />
                    {/* <button className="btn btn-outline-success my-2 my-sm-0" type="button">Search</button> */}
                </form>
            </div>
        )
    }
}

export default SearchBox

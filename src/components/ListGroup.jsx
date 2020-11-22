import React from 'react'
function ListGroup(props) {
    return (
        <React.Fragment>
            <div className="ListGroup list-group ">
                <button type="button" className="list-group-item list-group-item-action active">All genres</button>
                <button type="button" className="list-group-item list-group-item-action">Action </button>
                <button type="button" className="list-group-item list-group-item-action">Trailer</button>
                <button type="button" className="list-group-item list-group-item-action">comedy</button>

            </div>
        </React.Fragment>
    )
}


export default ListGroup
import React from 'react'

function ListGroup(props) {
    const { genres } = props;
    return (
        <div>
            {/* <div className="ListGroup list-group ">
                <button type="button" className="list-group-item list-group-item-action active">All Genres</button>
                {genres.map((genre) =>
                    <button type="button" className="list-group-item list-group-item-action">{genre.name} </button>
                )}
            </div> */}
            <ul className="list-group" style={{ cursor: "pointer" }}>
                <li className="list-group-item active">All Genres</li>
                {genres.map(x => (
                    <li key={x._id} className="list-group-item" style={{ cursor: "pointer" }}>
                        {x.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListGroup
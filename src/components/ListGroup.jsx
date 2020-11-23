import React from 'react'
import { getGenres } from '../Services/fakeGenreService'
function ListGroup(props) {
    const list = getGenres()
    return (
        <React.Fragment>
            <div className="ListGroup list-group ">
                <button type="button" className="list-group-item list-group-item-action active">All Genres</button>
                {list.map((genres) =>
                    <button type="button" className="list-group-item list-group-item-action">{genres.name} </button>
                )}


            </div>
        </React.Fragment>
    )
}


export default ListGroup
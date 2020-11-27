import React from 'react'

function ListGroup(props) {
    const { genres, idProperty, nameProperty, selectedGenre, onGenreClick } = props;
    return (
        <div>
            {/* <div className="ListGroup list-group ">
                <button type="button" className="list-group-item list-group-item-action active">All Genres</button>
                {genres.map((genre) =>
                    <button type="button" className="list-group-item list-group-item-action">{genre.name} </button>
                )}
            </div> */}
            <ul className="list-group">
                {/* <li className="list-group-item active" style={{ cursor: "pointer" }}>All Genres</li> */}
                {genres.map(x => (
                    <li key={x[idProperty]} className={x === selectedGenre ? "list-group-item active" : "list-group-item"} onClick={() => onGenreClick(x)} style={{ cursor: "pointer" }}>
                        {x[nameProperty]}
                    </li>
                ))}
            </ul>
        </div>
    )

}
ListGroup.defaultProps = {
    idProperty: "_id",
    nameProperty: "name"
} //making the component independent so it can be reusable

export default ListGroup
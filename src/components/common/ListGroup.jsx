import React from 'react'

function ListGroup(props) {
    const { genres, idProperty, nameProperty, selectedGenre, onGenreClick } = props;
    return (
        <div>

            <ul className="list-group">
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
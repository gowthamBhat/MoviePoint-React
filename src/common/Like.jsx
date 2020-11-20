import React, { Component } from 'react'

class Like extends Component {

    render() {
        const { liked, toggleLiked } = this.props
        var heart = "fa fa-heart"
        if (!liked.liked)
            heart += "-o"

        return (
            <div>
                <i className={heart} aria-hidden="true" onClick={toggleLiked}></i>
            </div>
        )
    }
}
export default Like
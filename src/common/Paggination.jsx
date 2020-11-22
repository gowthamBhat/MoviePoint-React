import React from 'react';

import _ from 'lodash';
import propTypes from 'prop-types';

const Paggination = ({ onClickPageNumber, currentPage, pageSize, itemCount }) => {
    const pagesCount = Math.ceil(itemCount / pageSize);
    if (pagesCount === 1)
        return null;
    const pages = _.range(1, pagesCount + 1);

    return (
        <div>
            <nav>
                <ul className="pagination">
                    {pages.map((page) => {
                        return (
                            <li key={page} className={page === currentPage ? "page-item active" : "page-item "}>
                                <span className="page-link" style={{ cursor: "pointer" }} onClick={() => onClickPageNumber(page)}>{page}</span>
                            </li>
                        )
                    })}


                </ul>
            </nav>
        </div>
    )
}
Paggination.propTypes = {
    onClickPageNumber: propTypes.func.isRequired,
    currentPage: propTypes.number.isRequired,
    pageSize: propTypes.number.isRequired,
    itemCount: propTypes.number.isRequired
}

export default Paggination
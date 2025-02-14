import React from 'react';
import {Search_Bar} from './assets/scss/SearchBar.scss';

function SearchBar({searchEmail}) {
    return (
        <div className={Search_Bar}>
            <input
                type='text'
                placeholder='찾기'
                onChange={(e) => {
                    searchEmail(e.target.value)
                }}/>
        </div>
    );
}

export default SearchBar;
import React from 'react';
import {PropTypes} from 'prop-types';

function MyComponent({props01, props02, props03, props04, props05, props06, props07, props08, props09}) {
    return (
        <div>
            <h2>Property Validation</h2>

            <span>props01: {'-- not set --'}</span>
            <br/>

            <span>props02: {'-- not set --'}</span>
            <br/>

            <span>props03: {'-- not set --'}</span>
            <br/>

            <span>props04: {'-- not set --'}</span>
            <br/>

            <span>props05: {'-- not set --'}</span>
            <br/>

            <span>props06: {'-- not set --'}</span>
            <br/>

            <span>props07: {'-- not set --'}</span>
            <br/>

            <span>props08: {'-- not set --'}</span>
            <br/>

            <span>
                {'props09:'}
                {'-- not set --'}
            </span>
            <br/>

        </div>
    );
}


export default MyComponent;
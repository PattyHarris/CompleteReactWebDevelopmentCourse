import React from 'react';
import Option from './Option';

const Options = (props) => (
    <div>
        <button
            className="button button--link"
            onClick={props.handleDeleteOptions}
        >
            Remove All
        </button>
        { props.options.length == 0 && <p>Please add an option to get started!</p> }
        {
            /*  Return isn't really needed since there's just one statement...*/
            props.options.map( (option)  => (
                 <Option
                     key={option}
                     optionText={option}
                     handleDeleteOption={props.handleDeleteOption}
                 />
            ))
        }

    </div>
);

export default Options;

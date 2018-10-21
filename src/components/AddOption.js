import React from 'react';

export default class AddOption extends React.Component {

    state = {
        error: undefined
    }

    handleAddOption = (e)  => {
        // Prevents full page refresh.
        e.preventDefault();

        // Access the value entered - target is the form element which
        // has access to elements - each is accessed by name, in this case,
        // we gave the input name="option".
        const option = e.target.elements.option.value.trim();

        // The parent component returns an error string if the option
        // is empty or already exists.
        const error = this.props.handleAddOption(option);

        // If the name of the state value is the same as the new
        // value, e.g. error: error, you can just use 'error'.   So,
        // this is the same as below:
        // this.setState( () => {
        //     return {
        //         error: error
        //     };
        // });

        // Uses the simplified arrow function returning an object: ({})
        this.setState( () =>  ({ error }) );

        // If there are no errors, clear the input field.
        if (!error) {
            e.target.elements.option.value = '';
        }
    };

    render() {
        return (
            <div>
                { this.state.error && <p className="add-option-error">{this.state.error}</p>}
                <form className="add-option" onSubmit={this.handleAddOption}>
                    <input
                        className="add-option__input"
                         type="text"
                         name="option"
                     />
                    <button className="button">Add Option</button>
                </form>
            </div>
        );
    }
}

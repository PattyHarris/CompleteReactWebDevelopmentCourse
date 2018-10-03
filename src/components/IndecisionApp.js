import React from 'react';

// Components
import AddOption from './AddOption';

import Header from './Header';
import Action from './Action';
import Options from './Options';

export default class IndecisionApp extends React.Component {

    state = {
        options: []
    };

    //--------------------------------------
    // Event handlers
    //--------------------------------------

    // Callback function used to remove all the options.  This also uses
    // the simplified version of the arrow function to return an object -
    // when returning an object, you need to enclose the object in (),
    // e.g. ({ object })
    handleDeleteOptions = () => {
        this.setState( () => ({  options: [] }))
    };

    // Delete a single option.  To delete the option, setState will once again
    // return an object using the shorthand notation.  Filter is used to return
    // a new array minus the option we've removed.
    handleDeleteOption = (optionToRemove) => {
        // Don't forget - setState must return an object...and for record keeping, the following
        // is simplified again since the return is a single statement.
        // this.setState( (prevState) => ({
        //     options: prevState.options.filter( (option) => {
        //         return optionToRemove !== option;
        //     })
        // }))
        this.setState( (prevState) =>  ({
            options: prevState.options.filter( (option) => optionToRemove !== option)
        }));
    };

    // Callback function to randomly pick an option
    handlePick = () => {
        const randomNumber = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNumber];
    };

    // Callback function that also takes a parameter.  Note the use of
    // concat instead of push, since we can't change state directly - we
    // need to create a new array.
    handleAddOption = (option) => {

        // Check for empty string, returning the error back to Add Option.
        if (!option) {
            return 'Enter valid value to add item.'
        }
        else if (this.state.options.indexOf(option) > -1) {
            // Make sure the string is unique in the array.
            return 'This option already exists.'
        }

        // Uses the simplified arrow function returning an object: ({})
        this.setState( (prevState) => ({
                options: prevState.options.concat([option])
            }) );
    };

    // End event handlers

    //--------------------------------------
    // Lifecycle methods.....
    //--------------------------------------

    componentDidMount() {
        console.log('componentDidMount: fetching data');

        // Using the try/catch to catch really only if 'parse' throws, which
        // it will do if the JSON is invalid.
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            // NOTE: since the local variable is the same as the
            // options property value is coming the the variable of the
            // same name.  So this is the same as below:
            // this.setState( () => ({ options: options }));
            // which is the same as
            // this.setState( () => {
            //     return {
            //         options: options
            //     }
            // })

            // NOTE: if there are no options (e.g. localStorage is empty),
            // getItem returns NULL.  If you then pass NULL into parse, parse
            // also returns NULL.  So only setState if the options array contains data
            // and is valid JSON.

            if (options) {
                this.setState( () => ({options}));
            }

        }
        catch (e) {
            // Do nothing - use the default empty options array.
        }

    }

    componentDidUpdate(prevProps, prevState) {
        // Only save the data if the data has actually changed.
        // This method is called even if the resulting data does not cause
        // a re-render, e.g. calling "remove all" on an empty options array.

        if (prevState.options.length !== this.state.options.length) {
            console.log('componentDidUpdate: saving data');

            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }

    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    // End lifecycle methods

    render() {

        const subtitle = "Put your life in the hands of a computer";

        return (
            <div>
                <Header  subtitle={subtitle} />
                <Action
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption
                    handleAddOption={this.handleAddOption}
                />
            </div>
        );
    }
} // End of IndecisionApp

// Since this is a class, we can add the export to the class definition.
// export default IndecisionApp;

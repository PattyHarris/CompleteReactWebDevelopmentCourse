
class IndecisionApp extends React.Component {

    constructor(props) {
        super(props);

        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);

        this.state = {
            options: props.options
        };
    }

    // Lifecycle methods.....
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


    // Callback function used to remove all the options.  This also uses
    // the simplified version of the arrow function to return an object -
    // when returning an object, you need to enclose the object in (),
    // e.g. ({ object })
    handleDeleteOptions() {
        this.setState( () => ({  options: [] }))
    }

    // Delete a single option.  To delete the option, setState will once again
    // return an object using the shorthand notation.  Filter is used to return
    // a new array minus the option we've removed.
    handleDeleteOption(optionToRemove) {
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
    }

    // Callback function to randomly pick an option
    handlePick() {
        const randomNumber = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNumber];
    }

    // Callback function that also takes a parameter.  Note the use of
    // concat instead of push, since we can't change state directly - we
    // need to create a new array.
    handleAddOption(option) {
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
    }

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

IndecisionApp.defaultProps = {
    options: []
}

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            { props.subtitle && <h2>{props.subtitle}</h2> }
        </div>
    );
}

// Default props
Header.defaultProps = {
    title: 'Indecision'
}

const Action = (props) => {
    return (
        <div>
            <button
                onClick={props.handlePick}
                disabled={!props.hasOptions}
            >
                What should I do?
            </button>
        </div>
    );
}

const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleDeleteOptions}>Remove All</button>
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
}

const Option = (props) => {
    return (
        <div>
            {props.optionText}
            <button
                onClick={(e) => {
                    props.handleDeleteOption(props.optionText);
                }}
            >
                Remove
            </button>
        </div>
    );
}

class AddOption extends React.Component {

    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);

        this.state = {
            error: undefined
        }
    }

    handleAddOption (e)  {
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
                { this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option" />
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));

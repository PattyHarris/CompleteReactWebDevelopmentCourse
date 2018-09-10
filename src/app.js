
class IndecisionApp extends React.Component {

    constructor(props) {
        super(props);

        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);

        this.state = {
            options: []
        };
    }

    // Callback function used to remove all the options.
    handleDeleteOptions() {
        this.setState( () => {
            return {
                options: []
            };
        });
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

        this.setState( (prevState) => {
            return {
                options: prevState.options.concat([option])
            }
        })
    }

    render() {

        const title = "Indecision";
        const subtitle = "Put your life in the hands of a computer";

        return (
            <div>
                <Header  title={title} subtitle={subtitle} />
                <Action
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                />
                <AddOption
                    handleAddOption={this.handleAddOption}
                />
            </div>
        );
    }
}

class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h2>{this.props.subtitle}</h2>
            </div>
        );
    }
}

class Action extends React.Component {

    render() {
        return (
            <div>
                <button
                    onClick={this.props.handlePick}
                    disabled={!this.props.hasOptions}
                >
                    What should I do?
                </button>
            </div>
        );
    }
}

class Options extends React.Component {

    render() {
        return (
            <div>
                <button onClick={this.props.handleDeleteOptions}>Remove All</button>
                {
                    /*  Return isn't really needed since there's just one statement...*/
                    this.props.options.map( (option)  => {
                        return <Option key={option} optionText={option} />
                    })
                }

            </div>
        );
    }
}

class Option extends React.Component {
    render() {
        return (
            <div>
                {this.props.optionText}
            </div>
        );
    }
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
        this.setState( () => {
            return { error };
        });

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


class IndecisionApp extends React.Component {

    render() {

        const title = "Indecision";
        const subtitle = "Put your life in the hands of a computer";
        const options = ['Thing one', 'Thing two', 'Thing four' ];

        return (
            <div>
                <Header  title={title} subtitle={subtitle} />
                <Action />
                <Options options={options} />
                <AddOption />
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
    handlePick() {
        alert("handlePick button clicked.")
    }
    render() {
        return (
            <div>
                <button onClick={this.handlePick}>What should I do?</button>
            </div>
        );
    }
}

class Options extends React.Component {
    constructor(props) {
        super(props);
        this.handleRemoveAll = this.handleRemoveAll.bind(this);
    }

    handleRemoveAll() {
        console.log(this.props.options);
    }

    render() {
        return (
            <div>
            <button onClick={this.handleRemoveAll}>Remove All</button>
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

    handleAddOption (e)  {
        // Prevents full page refresh.
        e.preventDefault();

        // Access the value entered - target is the form element which
        // has access to elements - each is accessed by name, in this case,
        // we gave the input name="option".
        const option = e.target.elements.option.value.trim;

        // Strings have 'falsey' properties, so you can check their existence.
        if (option) {
            // For the challenge, we need to send an alert.
            alert("Form submitted.");

            // Add the option to the array and clear the input field.
            // Re-render the list of items.
            // app.options.push(option);
            // e.target.elements.option.value = '';
            // renderApp();
        }
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option" />
                    <button>Add Option</button>
                </form>
            </div>
        )
    }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));

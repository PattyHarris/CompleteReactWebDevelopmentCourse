// Counter app reworked using Components and state.
class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOne = this.handleAddOne.bind(this);
        this.handleMinuesOne = this.handleMinuesOne.bind(this);
        this.handleReset = this.handleReset.bind(this);

        // With local storage, default props isn't needed.
        // this.state = {
        //     count: props.count
        // };

        this.state = {
            count: 0
        };

    }

    // Lifecycle methods.....
    componentDidMount() {
        console.log('componentDidMount: fetching data');

        // Because count isn't an object as in IndecisionApp's
        // options, we can just convert the number from a string
        // to an int and check that it's valid.

        const countString = localStorage.getItem('count');
        const count = parseInt(countString, 10);

        if ( !isNaN(count)) {
            this.setState( () => ({count}));
        }
        else {
            console.log(count + " is not a valid number!");
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // Only update if the data is different.
        if (prevState.count !== this.state.count) {
            console.log("componentDidUpdate: saving data");
            localStorage.setItem('count', this.state.count);
        }

    }

    // We added this to the IndecisionApp, but haven't used it (yet).
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    handleAddOne() {
        this.setState( (prevState) => {
            // Returns an object, e.g. {}
            return {
                count: prevState.count + 1
            };
        });
    }

    handleMinuesOne() {
        this.setState( (prevState) => {
            return {
                count: prevState.count - 1
            };
        });
    }

    handleReset() {
        this.setState( () => {
            return {
                count: 0
            };
        });
    }

    render() {
        return (
            <div>
                <h1>Counter:  {this.state.count}</h1>
                <button  onClick={this.handleAddOne}>+1</button>
                <button  onClick={this.handleMinuesOne}>-1</button>
                <button  onClick={this.handleReset}>reset</button>
            </div>
        );
    }
} // End of Counter

// Challenge - add default props.  If a value is passed in, as below,
// it is used.  Otherwise, 0 is output as the default.  No used once we
// switched in localStorage.
// Counter.defaultProps = {
//     count: 0
// }

// You can also pass in a default value as shown here, but the purposes of the localStorage
// challenge, this is commented out.
// ReactDOM.render(<Counter count={25}/>, document.getElementById('app'));
ReactDOM.render(<Counter />, document.getElementById('app'));

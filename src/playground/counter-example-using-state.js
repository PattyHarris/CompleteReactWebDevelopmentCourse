// Counter app reworked using Components and state.
class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOne = this.handleAddOne.bind(this);
        this.handleMinuesOne = this.handleMinuesOne.bind(this);
        this.handleReset = this.handleReset.bind(this);

        this.state = {
            count: 0
        };
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
}

ReactDOM.render(<Counter />, document.getElementById('app'));
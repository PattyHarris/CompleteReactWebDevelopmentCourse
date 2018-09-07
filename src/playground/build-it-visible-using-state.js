
/*
    This "Build It" lesson has the following requirements starts with the
    prior build-it-visible.js, and changes it to use React Components and state.

    NOTE: switched to the code to using the inline tags as in the class
    instead of using a separate method.....
    1. Add A render, constructor, and method handleToggleVisibility
    2. Set the initial state attribute, visibility to false.

    To render this page, change babel to use this page using the following command:
    >babel src/playground/build-it-visible-using-state.js --out-file=public/scripts/app.js --presets=env,react --watch
*/

class VisibilityToggle extends React.Component {

    constructor(props) {
        super(props);

        this.handleToggleVisibility = this.handleToggleVisibility.bind(this);

        this.state = {
            visibility: false
        };
    }

    // NOTE: don't forget to return a state OBJECT in setState....
    handleToggleVisibility() {
        this.setState( (prevState) => {
            return {
                visibility: !prevState.visibility
            };
        });
    }

    render() {
        return (
            <div>
                <h1>Visibility Toggle</h1>
                <button onClick={this.handleToggleVisibility}>
                    {this.state.visibility ? 'Hide details' : 'Show details'}
                </button>
                {this.state.visibility && (
                    <div>
                        <p>Hey. These are some details you can now see!</p>
                    </div>
                )}
            </div>
        );
    }
}

ReactDOM.render(<VisibilityToggle />, document.getElementById('app'));

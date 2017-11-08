/** @jsx React.DOM */

var Hello = React.createClass({
    propTypes: {
        now: React.PropTypes.string.isRequired,
        b: function(props, propName, componentName) {
            if (props[propName] < 5) {
                throw new Error(propName + " must be 5 or greater");
            }
        }
    },
    render: function() {
        return    <div>
                      <h1>Hello at {this.props.now}{' '}{this.props.b}</h1>
                  </div>;
    }
});

React.renderComponent(
    <Hello now={new Date().toString()} b={7} />, 
    document.body
);



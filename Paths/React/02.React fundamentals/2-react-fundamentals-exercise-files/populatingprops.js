/** @jsx React.DOM */

var Hello = React.createClass({

    render: function() {
        return    <div>
                      <h1>Hello at {this.props.now}{' '}{this.props.b}</h1>
                  </div>;
    }
});

React.renderComponent(
    <Hello now={new Date().toString()} b="7" />, 
    document.body
);



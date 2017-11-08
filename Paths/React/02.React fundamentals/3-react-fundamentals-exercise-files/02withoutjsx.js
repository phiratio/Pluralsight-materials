/** @jsx React.DOM */

var Hello = React.createClass({

    render: function() {
        return    React.DOM.div(null, React.DOM.h1(null, "Hello at ", this.props.now));
    }
});

React.renderComponent(Hello({now: new Date().toString()}), document.body);
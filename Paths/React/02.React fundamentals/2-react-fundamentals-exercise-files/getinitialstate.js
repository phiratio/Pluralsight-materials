/** @jsx React.DOM */

var ShowState = React.createClass({
    getInitialState: function () {
        return {answer: 42};
    },
    render: function() {
        return <div>my state is {this.state.answer}</div>;
    }
});

React.renderComponent(<ShowState />, document.body);



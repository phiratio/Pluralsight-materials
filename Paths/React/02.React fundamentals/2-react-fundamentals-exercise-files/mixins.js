/** @jsx React.DOM */

var Highlight = {    
    componentDidUpdate: function () { 
        var node = $(this.getDOMNode());
        node.slideUp();
        node.slideDown();
    }
};

var Count = React.createClass({
    getInitialState: function () {
        var state = {counter: 1};
        setInterval(function () {
            this.setState({counter: this.state.counter + 1});
        }.bind(this), 4000);
        return state;
    },
    render: function() {
        return    <div>
                      <h1>Counter</h1>
                      <p>{this.state.counter}</p>
                  </div>;
    },
    mixins: [Highlight]
});

React.renderComponent(
    <Count />, 
    document.body
);



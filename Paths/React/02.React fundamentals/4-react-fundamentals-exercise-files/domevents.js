/** @jsx React.DOM */

var Echo = React.createClass({
    render: function() {
        return <input type="text" onChange={this.handleChange} />;
    },
    handleChange: function (e) {
        console.log(e.target.value);
    }
});

 
React.renderComponent(<Echo />, document.body);

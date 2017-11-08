/** @jsx React.DOM */

var UncontrolledComponent = React.createClass({
    render: function() {
        return <input type="text"
                 onChange={this.handleChange} />;
    },
    handleChange: function (e) {
        console.log(e.target.value);
    }
});
 
React.renderComponent(<UncontrolledComponent />, document.body);

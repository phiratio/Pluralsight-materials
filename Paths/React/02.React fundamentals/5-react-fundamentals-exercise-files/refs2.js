/** @jsx React.DOM */

var RefTest = React.createClass({
    render: function() {
        return <div><input type="text" ref="first" /><br/>
        <input type="text" ref="second" /><br/>
        <input type="button" value="Add" onClick={this.handleAdd} /></div>;
    },
    handleAdd: function () {
        alert(parseFloat(this.refs.first.getDOMNode().value) + parseFloat(this.refs.second.getDOMNode().value));
    }
});
 
React.renderComponent(<RefTest />, document.body);

/** @jsx React.DOM */

var GetDOMNodeTest = React.createClass({
    render: function() {
        return <input ref="inp" type="text" onChange={this.handleChange} />;
    },
    handleChange: function () {
       console.log(this.refs.inp.getDOMNode().value);
    }
});
 
React.renderComponent(<GetDOMNodeTest />, document.body);

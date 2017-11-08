/** @jsx React.DOM */

var RefTest = React.createClass({
    render: function() {
        return <input type="text" ref="inp"
                 onChange={this.handleChange} />;
    },
    componentDidMount: function () {
        this.refs.inp.getDOMNode().value = "set by ref";
    }
});
 
React.renderComponent(<RefTest />, document.body);

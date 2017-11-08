/** @jsx React.DOM */

var ControlledComponent = React.createClass({
    render: function() {
        return <input type="text" value="init" />;
    }
});
 
React.renderComponent(<ControlledComponent />, document.body);

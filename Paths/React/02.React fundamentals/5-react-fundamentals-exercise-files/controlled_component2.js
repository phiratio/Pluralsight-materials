/** @jsx React.DOM */

var ControlledComponent = React.createClass({
    getInitialState: function () {
        return {init:'init'};
    },
    render: function() {
        return <input type="text" value={this.state.init} 
                 onChange={this.handleChange} />;
    },
    handleChange: function (e) {
        this.setState({ init: e.target.value} );
    }
});
 
React.renderComponent(<ControlledComponent />, document.body);

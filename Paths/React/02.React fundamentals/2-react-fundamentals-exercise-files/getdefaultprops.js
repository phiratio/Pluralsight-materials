/** @jsx React.DOM */

var Text = React.createClass({
    getDefaultProps: function () {
        return {
            foregroundColor: 'green',
            backgroundColor: 'red'
        };
    },
    render: function() {
        var styles = {
            color: this.props.foregroundColor,
            backgroundColor: this.props.backgroundColor
        };
        return <p style={styles} >{this.props.content}</p>;
    }
});

React.renderComponent(<Text content="Once upon a time..." />, document.body);


